const express = require("express");
const router = express.Router();
const {
    handleAddReview,
    handleGetPropertyReview,
    handleUpdateReviewByID,
    handleDeleteReviewByID
} = require("../controllers/review");

router.post('/AddReview', handleAddReview);
router.get("/property/:id/reviews", handleGetPropertyReview);

router.route("/:id")
    .patch(handleUpdateReviewByID)
    .delete(handleDeleteReviewByID)


module.exports = router;