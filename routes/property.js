const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
})
const upload = multer({ storage: storage })


const {
    handleCreateProperty,
    handleGetAllProperties,
    handlegetPropertyByID,
    handleupdatePropertyByID,
    handleDeletePropertyID,
    handleGetPropertyFilter
} = require("../controllers/property");

router.post("/createProperty", upload.array('propertyImages', 10), handleCreateProperty);
router.get('/', handleGetAllProperties);
router.get("/filterProperties", handleGetPropertyFilter);

router.route("/:id")
    .get(handlegetPropertyByID)
    .patch(handleupdatePropertyByID)
    .delete(handleDeletePropertyID)

module.exports = router;