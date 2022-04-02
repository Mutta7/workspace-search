const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [1000000, "Zip code too short"],
        max: 9999999
    },
    workspaces: [{type: mongoose.Schema.Types.ObjectId, ref: "Workspace"}]
  });

subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model("Subscriber").find({zipCode: this.zipCode}).exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);