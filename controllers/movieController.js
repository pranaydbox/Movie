var moviemodel = require("../models/movieModel")
var theatremodel = require("../models/theatreModel")
var theatreController = require("./theatreController")
var reviewmodel = require("../models/reviewModel");
var reviewController = require("../controllers/reviewController")


async function addmovie(req, res) {
    console.log(1)
    var languages = req.body.languages.split(",")
    var format = req.body.format.split(",")
    var category = req.body.category.split(",")
    var movie = new moviemodel.movieModel({
        movieId: req.body.movieId,
        cardImage: req.files.cardImage[0].location,
        coverImage: req.files.coverImage[0].location,
        name: req.body.name,
        category: category,
        duration: req.body.duration,
        languages: languages,
        format: format,
        description: req.body.description,
        bookings: req.body.bookings,
        access: req.body.access,
        startDate: req.body.startDate
    })
    let result = await movie.save();
    var review = new reviewmodel.reviewModel({
        movieId: req.body.movieId,
    })
    await review.save();
    res.send("Movie added successfully")

}



async function addexisting(req, res) {
    var movieId = req.params.id;
    let movieData = await moviemodel.movieModel.findOne({ movieId: movieId });

    let theatreUpdateResult = await theatreController.updatetheatre(movieData.movieId, movieData.name, movieData.cardImage, req.body.curremail);
    let theatreData = await theatremodel.theatreModel.findOne({ ownerEmail: req.body.curremail });
    var obj = {
        theatreId: theatreData.theatreId,
        theatreName: theatreData.theatreName,
        category: theatreData.category,
        location: theatreData.location
    }
    let movieUpdateResult = await moviemodel.movieModel.updateOne({ movieId: movieData.movieId }, { $push: { theatreObjects: obj } })
    res.send("Existed Movie added successfully")
}





function getownermovies(req, res) {
    theatremodel.theatreModel.findOne({ ownerEmail: req.body.curremail }, (err, data) => {
        console.log(data);
        res.send(data.movieObjects);
    });
}
function getmoviesbylanguages(req, res) {
    console.log(10000)
    moviemodel.movieModel.find({ theatreObjects: { $not: { $size: 0 } }, languages: { $in: ["Telugu"] } }, (err, data) => {
        res.send(data);
    })
}

function getmoviesbycategories(req, res) {
    moviemodel.movieModel.find({ theatreObjects: { $not: { $size: 0 } }, categories: { $in: ["Thrill"] } }, (err, data) => {
        res.send(data);
    })
}

function getmovies(req, res) {
    moviemodel.movieModel.find({ theatreObjects: { $not: { $size: 0 } } }, (err, data) => {
        res.send(data);
    })
}

async function getmovie(req, res) {
    var movieData = await moviemodel.movieModel.findOne({ movieId: req.params.id });
    // // var ratingavg=await moviemodel.movieModel.aggregate([{$unwind:"$reviewObjects"},{$group:{_id:"$movieId","avgrating":{$avg:"$reviewObjects.rating"}}}])
    // var ratingavg=await moviemodel.movieModel.aggregate([{$match:{movieId:req.params.id}},{$unwind:"$reviewObjects"},{$group:{_id:"$movieId",avgrating:{$avg:"$reviewObjects.rating"}}}])
    // var obj=Object.assign({},movieData)
    // obj._doc.ratingavg=ratingavg[0].avgrating;
    // console.log(ratingavg);
    res.send(movieData);
}


async function removeownermovie(req, res) {
    let data = await theatremodel.theatreModel.findOne({ ownerEmail: req.body.curremail });
    let resultOfMovieRemoveFromTheatre = await theatreController.removemoviefromtheatre(req.body.curremail, req.body.movieId);
    let resultOfTheatreRemoveFromMovie = await moviemodel.movieModel.updateOne({ movieId: req.body.movieId }, { $pull: { theatreObjects: { theatreId: data.theatreId } } }).then((e) => { console.log(e) });
    // console.log(resultOfMovieRemoveFromTheatre+":"+resultOfTheatreRemoveFromMovie);
    res.send("Successfully Deleted Movie From Theatre")
}



async function gettopsixmovies(req, res) {
    console.log(globalThis.host)
    let data = await moviemodel.movieModel.find({}).sort({ "bookings": -1 }).limit(3);
    return res.send(data);
}


async function getexistingmovies(req, res) {
    let data = await theatremodel.theatreModel.findOne({ ownerEmail: req.body.curremail });
    // console.log(data)
    moviemodel.movieModel.find({ theatreObjects: { $not: { $elemMatch: { theatreId: data.theatreId } } } }, (err, data) => {
        // console.log(data);
        res.send(data);
    })
}

async function removemovie(req, res) {
    await moviemodel.movieModel.deleteOne({ movieId: req.body.movieId })
    await theatremodel.theatreModel.updateMany({}, { $pull: { movieObjects: { movieId: req.body.movieId } } })
    await reviewController.removereviews(req.body.movieId);
    res.send("Successfully deleted movie");
}


function getmoviesbyfilters(req, res) {
    var category = []
    if (req.body.category.thriller == 1) category.push("thriller")
    if (req.body.category.action == 1) category.push("action")
    if (req.body.category.adventure == 1) category.push("adventure")
    if (req.body.category.comedy == 1) category.push("comedy")
    if (req.body.category.suspense == 1) category.push("suspense")
    if (category.length == 0) {
        var ar = ["thriller", "action", "adventure", "comedy", "suspense"]
        category.push(...ar)
    }

    var format = []
    if (req.body.format.twoD == 1) format.push("2D")
    if (req.body.format.threeD == 1) format.push("3D")
    if (req.body.format.fourDX == 1) format.push("4DX")
    if (req.body.format.IMAX == 1) format.push("IMAX")
    if (format.length == 0) {
        var ar = ["2D", "3D", "4DX", "IMAX"]
        format.push(...ar)
    }

    var languages = []
    if (req.body.language.Telugu == 1) languages.push("Telugu")
    if (req.body.language.Hindi == 1) languages.push("Hindi")
    if (req.body.language.English == 1) languages.push("English")
    if (req.body.language.Kannada == 1) languages.push("Kannada")
    if (req.body.language.Malayalam == 1) languages.push("Malayalam")
    if (languages.length == 0) {
        var ar = ["Telugu", "Hindi", "English", "Kannada", "Malayalam"]
        languages.push(...ar)
    }



    moviemodel.movieModel.find({
        theatreObjects: { $not: { $size: 0 } },
        $and:
            [
                {
                    $or: [
                        { "category": { $in: category } }
                    ]
                },
                {
                    $or: [
                        { "format": { $in: format } }
                    ]
                },
                {
                    $or: [
                        { "languages": { $in: languages } }
                    ]
                }
            ]
    }, (err, data) => {
        console.log(data);
        res.send(data)
    })
}


module.exports = { addmovie, getmovies, getmovie, addexisting, getownermovies, removeownermovie, gettopsixmovies, getexistingmovies, removemovie, getmoviesbylanguages, getmoviesbycategories,getmoviesbyfilters};