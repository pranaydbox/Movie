var conn=require("./connection")
var mongoose=conn.mongoose;

var analyticsSchema={
    pagename:{type:String},
    visitsdata:[{date:{type:String},count:{type:String},bouncerate:{type:String},time:{type:String},loggedvisits:{type:String}}]
}

var analyticsModel=mongoose.model("analytics",analyticsSchema);

module.exports={analyticsModel};