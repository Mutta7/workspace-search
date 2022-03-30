const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/workspace_db",
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", ()=>{
    console.log("Successfully connected to MongoDB using Mongoose!");
})

app.set("port", process.env.PORT || 3000);

app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({extended: false})
);
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/workspaces", homeController.showWorkspaces);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
    res.render("subscribers", {subscribers: req.data});
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});