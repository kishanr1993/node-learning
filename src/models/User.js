const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
        },

        status: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true,
        collection: "users"
    }
);

module.exports = mongoose.model("User", userSchema);