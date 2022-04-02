const { MongoGridFSChunkError } = require("mongodb");

const mongoose = require("mongoose"),
    {Schema} = mongoose;

var userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
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
    password: {
        type: String,
        required: true
    },
    workspaces: [{type: mongoose.Schema.Types.ObjectId, ref: "Workspace"}],
    subscribedAccount: {type: mongoose.Schema.Types.ObjectId, ref: "Subscriber"}
},
{
    timestamps: true
});

userSchema.virtual("fullname").get(function(){
    return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);
