const authService = require("../services/authService");

// register
exports.register = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;
        const role = req.body.role || req.body.roleId;

        // Basic validation
        if (!name || !email || !password) {

            return res.status(422).json({
                success: false,
                message: "Name, email and password are required"
            });

        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {

            return res.status(422).json({
                success: false,
                message: "Invalid input types"
            });

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            return res.status(422).json({
                success: false,
                message: "Invalid email address"
            });

        }

        if (password.length < 8 || password.length > 72) {

            return res.status(422).json({
                success: false,
                message: "Password must be between 8 and 72 characters"
            });

        }

        const user = await authService.register({
            name,
            email,
            password,
            role
        });

        res.status(201).json({

            success: true,

            message: "Registration successful",

            data: user

        });

    } catch (error) {

        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });

        }

        if (error.message === "Email already registered") {

            return res.status(409).json({
                success: false,
                message: error.message
            });

        }

        next(error);

    }

};

// login
exports.login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {

            return res.status(422).json({
                success: false,
                message: "Email and password are required"
            });

        }

        const result = await authService.login({
            email,
            password
        });

        res.status(200).json({

            success: true,

            message: "Login successful",

            data: result

        });

    } catch (error) {

        if (error.message === "Invalid email or password") {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        next(error);

    }

};


// LOGOUT
exports.logout = (req, res) => {

    res.status(200).json({

        success: true,

        message: "Logout successful. Remove your token from the client."

    });

};