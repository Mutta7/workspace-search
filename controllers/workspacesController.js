const workspace = require("../models/workspace");
const Workspace = require("../models/workspace");
const getWorkspaceParams = (body) => {
	return {
		name: body.name,
		address: body.address,
		zipCode: body.zipCode,
        description: body.description,
        equipments: body.equipments  
	};
};

module.exports = {
    index: (req, res, next) => {
        Workspace.find()
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
    },
    new: (req, res) => {
	    res.render("workspaces/new");
    },
    create: (req, res, next) => {
        let workspaceParams = getWorkspaceParams(req.body);
        Workspace.create(workspaceParams)
            .then(workspace => {
                res.locals.redirect = "/workspaces";
                res.locals.workspace = workspace;
                next();
            })
            .catch(error => {
                console.log(`Error saving workspace: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
	  	if (redirectPath) res.redirect(redirectPath);
	  	else next();
	},
    show: (req, res, next) => {
    	let workspaceId = req.params.id;
    	Workspace.findById(workspaceId)
      		.then(workspace => {
        		res.locals.workspace = workspace;
        		next();
      		})
      		.catch(error => {
        		console.log(`Error fetching workspace by ID: ${error.message}`);
        		next(error);
      		})
  	},
  	showView: (req, res) => {
    	res.render("workspaces/show");
  	},
    edit: (req, res, next) => {
    	let workspaceId = req.params.id;
    	Workspace.findById(workspaceId)
      		.then(workspace => {
        		res.render("workspaces/edit", {
          		workspace: workspace
        		});
      		})
      		.catch(error => {
        		console.log(`Error fetching workspace by ID: ${error.message}`);
        		next(error);
      		});
  	},
    update: (req, res, next) => {
        let workspaceId = req.params.id,
            workspaceParams = getWorkspaceParams(req.body);
		console.log(req.body);
        Workspace.findByIdAndUpdate(workspaceId, {
            $set: workspaceParams
        })
            .then(workspace => {
                res.locals.redirect = `/workspaces/${workspaceId}`;
                res.locals.workspace = workspace;
                next();
            })
            .catch(error => {
                console.log(`Error updating workspace by ID: ${error.message}`);
                next(error);
            })
    },
    delete: (req, res, next) => {
		let workspaceId = req.params.id;
		Workspace.findByIdAndRemove(workspaceId)
			.then(() => {
				res.locals.redirect = "/workspaces";
				next();
			})
			.catch(error => {
				console.log(`Error deleting workspace by ID: ${error.message}`);
				next();
			});
	}
};
