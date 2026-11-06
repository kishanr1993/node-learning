const userService = require("../services/userService");

exports.index = async (req, res, next) => {

    try {

        const result = await userService.getAllUsers(req.query);

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.users,
            pagination: result.pagination
        });

    } catch (error) {

        next(error);

    }

};