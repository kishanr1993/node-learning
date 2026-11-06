//Get All Roles
exports.index = async (req, res, next) => {
    
    res.status(200).json({
        success: true,
        message: "Your App is working fine...",
    });

};