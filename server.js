const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter");
const mongoose = require("mongoose");
const mgURL = "mongodb://kqian1993:8911236@cluster0-shard-00-00-tkip8.mongodb.net:27017,cluster0-shard-00-01-tkip8.mongodb.net:27017,cluster0-shard-00-02-tkip8.mongodb.net:27017/project1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
mongoose.connect(mgURL, { useNewUrlParser: true })
    .then(() => {
        console.log("database connect success");
    })
    .catch((error) => {
        console.log("database connect error:");
        console.log(error);
    });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    console.log("allow cors");
    next();
});
app.use("/api/users", userRouter);
app.get('*', function (req, res) {
    res.status(404).send('route not found');
});
app.listen(PORT);
console.log("server setup on port: " + PORT);