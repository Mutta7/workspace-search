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
    description: {
        type: String,
        required: true
    },
    equipments: [{type: String}]
}, {
    timestamps: true
});

module.exports = mongoose.model("Workspace", workspaceSchema)