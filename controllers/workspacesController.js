const Workspace = require("../models/workspace");

module.exports = {
  index: (req, res, next) => {
    Workspace.find({})
      .then(workspaces => {
        res.locals.workspaces = workspaces;
        next();
      })
      .catch(error => {
        console.log(`Error fetching workspaces: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("workspaces/index");
  }
};