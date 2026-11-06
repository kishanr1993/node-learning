const roleService = require("../services/roleService");


//Get All Roles
exports.index = async (req, res, next) => {

    try {

        const result = await roleService.getAllRoles(req.query);

        res.status(200).json({
            success: true,
            message: "Roles retrieved successfully",
            data: result.roles,
            pagination: result.pagination
        });

    } catch (error) {

        next(error);

    }

};