const Role = require("../models/Role");
const User = require("../models/User");
const mongoose = require("mongoose");

//Get All Roles
exports.getAllRoles = async (query) => {

    const page = Math.max(1, parseInt(query.page, 10) || 1);

    const limit = Math.min(
        100,
        Math.max(1, parseInt(query.limit, 10) || 10)
    );

    const filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    if (query.search) {

        const escaped = query.search.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        filter.$or = [
            { name: { $regex: escaped, $options: "i" } },
            { slug: { $regex: escaped, $options: "i" } }
        ];

    }

    const [roles, total] = await Promise.all([

        Role.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),

        Role.countDocuments(filter)

    ]);

    return {
        roles,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };

};