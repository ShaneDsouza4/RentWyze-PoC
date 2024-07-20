const express = require("express");
const router = express.Router();

const {
    handleCreateProperty,
    handleGetAllProperties,
    handlegetPropertyByID,
    handleupdatePropertyByID,
    handleDeletePropertyID
} = require("../controllers/property");

router.post("/createProperty", handleCreateProperty);
router.get('/', handleGetAllProperties);

router.route("/:id")
    .get(handlegetPropertyByID)
    .patch(handleupdatePropertyByID)
    .delete(handleDeletePropertyID)

module.exports = router;