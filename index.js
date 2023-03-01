var express = require('express')
var app = express()
// var bodyParser = require('body-parser');

app.use(express.urlencoded());

app.use(express.json());

// app.use(express.static('./views'));


var cors = require('cors')
app.use(cors())


var cookieparser = require('cookie-parser');
app.use(cookieparser())



var usersRouter = require("./routes/usersRoute");
app.use("/users", usersRouter)

var queryRouter = require("./routes/queryRoute");
app.use("/queries", queryRouter)


var movieRouter = require("./routes/movieRoute")
app.use("/movies", movieRouter)

var theatreRouter = require("./routes/theatreRoute")
app.use("/theatres", theatreRouter)


var bookingRouter = require("./routes/bookingRoute");
app.use("/bookings", bookingRouter);


var reviewRouter = require("./routes/reviewRoute");
app.use("/reviews", reviewRouter);

var analyticsRouter = require("./routes/analyticsRoute");
app.use("/analytics", analyticsRouter);


var authRouter = require('./routes/authRoute');
app.use("/auth", authRouter);


app.listen(3333)