const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");

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

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost: ${app.get("port")}`);
});