const express = require("express");
const router = express.Router();

const {
    handleCreateProperty
} = require("../controllers/property");

router.post("/createProperty", handleCreateProperty);


module.exports = router;