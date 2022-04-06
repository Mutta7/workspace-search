const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscribersController = require("./controllers/subscribersController"),
    usersController = require("./controllers/usersController"),
    workspacesController = require("./controllers/workspacesController"),
    methodOverride = require("method-override"),
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
app.set("view engine", "ejs");

router.use(layouts);
router.use(express.static("public"));

router.use(
    express.urlencoded({
      extended: false
    })
  );

router.use(express.json());

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}))

app.use(homeController.logRequestPaths);

router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update",usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/workspaces", workspacesController.index, workspacesController.indexView);
router.get("/workspaces/new", workspacesController.new);
router.post("/workspaces/create", workspacesController.create, workspacesController.redirectView);
router.get("/workspaces/:id", workspacesController.show, workspacesController.showView);
router.get("/workspaces/:id/edit", workspacesController.edit);
router.put("/workspaces/:id/update", workspacesController.update, workspacesController.redirectView);
router.delete("/workspaces/:id/delete", workspacesController.delete, workspacesController.redirectView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});