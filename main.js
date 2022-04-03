const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    workspacesController = require("./controllers/workspacesController"),
    layouts = require("express-ejs-layouts"),
    router = express.Router();

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/workspace_db",
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", ()=>{
    console.log("Successfully connected to MongoDB using Mongoose!");
})
mongoose.Promise = global.Promise

app.set("port", process.env.PORT || 3000);

app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(layouts);

app.use(
    express.urlencoded({extended: false})
);
app.use(express.json());
app.use("/", router);

app.use(homeController.logRequestPaths);

router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView);
app.get("/workspaces", workspacesController.index, workspacesController.indexView);
app.get("/subscribers", subscribersController.index,subscribersController.indexView);
app.post("/subscribe", subscribersController.saveSubscriber)

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});