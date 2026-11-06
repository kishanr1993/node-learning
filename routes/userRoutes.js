const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        message: "All users"
    });

});

router.get("/:id", (req, res) => {

    res.json({
        message: "Single user",
        id: req.params.id
    });

});

router.post("/", (req, res) => {

    res.json({
        message: "User created",
        data: req.body
    });

});

module.exports = router;