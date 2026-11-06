const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");
const Role = require("../models/Role");

// register
async function register(data) {

    const { name, email, password } = data;

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    let roleId = data.role || data.roleId;

    if (!roleId) {
        const defaultRole = await Role.findOne({ slug: "user" });
        if (defaultRole) {
            roleId = defaultRole._id;
        }
    } else if (!mongoose.isValidObjectId(roleId)) {
        const roleDoc = await Role.findOne({ slug: roleId });
        if (!roleDoc) {
            const error = new Error("Invalid role");
            error.status = 400;
            throw error;
        }
        roleId = roleDoc._id;
    }

    // Create user
    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        roleId: roleId,
        status: true
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
    };

}

// login
async function login(data) {

    const { email, password } = data;

    const normalizedEmail = email.trim().toLowerCase();

    // Find user 
    const user = await User.findOne({
        email: normalizedEmail
    }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            sub: user._id.toString(),
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            algorithm: "HS256"
        }
    );

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    };

}

module.exports = {
    register,
    login
};
