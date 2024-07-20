const express = require("express");
const router = express.Router();
const {
    handleAddReview,
    handleGetPropertyReview
} = require("../controllers/review");

router.post('/AddReview', handleAddReview);
router.get("/property/:id/reviews", handleGetPropertyReview);

module.exports = router;