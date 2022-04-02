const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        min: [1000000, "Zip code too short"],
        max: 9999999
    },
    equipments: []
});

module.exports = mongoose.model("Workspace", workspaceSchema)