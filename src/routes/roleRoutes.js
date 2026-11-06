const express = require("express");

const router = express.Router();

const roleController = require("../controllers/roleController");

//Get All Roles
router.get("/", roleController.index);

module.exports = router;

