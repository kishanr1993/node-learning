const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");


exports.getAllUsers = async (query) => {

    const page = Math.max(1, parseInt(query.page, 10) || 1);

    const limit = Math.min(
        100,
        Math.max(1, parseInt(query.limit, 10) || 10)
    );

    const filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    if (query.roleId) {

        if (!mongoose.isValidObjectId(query.roleId)) {
            const error = new Error("Invalid role ID");
            error.status = 400;
            throw error;
        }

        filter.roleId = query.roleId;
    }

    if (query.search) {

        const escaped = query.search.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        filter.$or = [
            { name: { $regex: escaped, $options: "i" } },
            { email: { $regex: escaped, $options: "i" } }
        ];

    }

    const sortField = ["name", "email", "createdAt"].includes(query.sort)
        ? query.sort
        : "createdAt";

    const sortOrder = query.order === "asc" ? 1 : -1;

    const [users, total] = await Promise.all([

        User.find(filter)
            .select("-password")
            .populate("roleId", "name slug")
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit),

        User.countDocuments(filter)

    ]);

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };

};


// save user
exports.createUser = async (data) => {

    let roleId = data.role || data.roleId;

    if (!mongoose.isValidObjectId(roleId)) {
        const role = await Role.findOne({ slug: roleId });
        if (!role) {
            const error = new Error("Invalid role");
            error.status = 400;
            throw error;
        }
        roleId = role._id;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        roleId: roleId
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;

};