var workspaces = [
    {
        title: "DMM.make AKIBA",
        address: "東京都千代田区神田練塀町3"
    },
    {
        title: "WeWork 丸の内北口",
        address: "東京都千代田区丸の内 1-6-5"
    },
    {
        title: "SPACES 赤坂",
        address: "東京都港区赤坂 2-5-8"
    },
];

exports.showWorkspaces = (req, res) => {
    res.render("workspaces", {
        workspacesList: workspaces
    });
};

exports.showSignUp = (req, res) => {
    res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
    res.render("thanks");
};