const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            default: null
        },
        permissions: {
            type: [String],
            default: []
        },
        status:{
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true,
        collection: "roles"
    }
);

module.exports = mongoose.model("Role", roleSchema);