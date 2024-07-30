const Review = require('../models/reviews');
const Property = require('../models/property');
const User = require('../models/user');

async function handleAddReview(req, res){
    try {
        const { property_id, tenant_id, rating, review } = req.body;

        const property = await Property.findById(property_id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        const tenant = await User.findById(tenant_id);
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }

        const newReview = await Review.create({
            property_id,
            tenant_id,
            rating,
            review
        })

        const userReview = await Review.findById(newReview._id).populate('tenant_id', 'firstName lastName');

        return res.status(201).json({msg:"Review created sucessfully", userReview});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating review" });
    }
}

async function handleGetPropertyReview(req, res){
    try{
        console.log(req.params.id)
        const reviews = await Review.find({ property_id: req.params.id }).populate('tenant_id', 'firstName lastName').sort({ created_at: -1 });                                                                                                     
        console.log(reviews);
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this property" });
        }
        res.status(200).json(reviews);
    }catch(error){
        res.status(500).json({ message: "Error retrieving reviews" });
    }
}

async function handleUpdateReviewByID(req, res){
    try{
        const { rating, review } = req.body;
        const updatedReview = await Review.findByIdAndUpdate( req.params.id, {rating, review});
        return res.status(200).json({msg:"success", updatedReview});
    }catch(error){
        res.status(500).json({ message: "Error Updating Reviews" });
    }
}

async function handleDeleteReviewByID(req, res) {
    try{
        await Review.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Reveiew deleted success!"});
    }catch(error){
        return res.status(500).json({msg:"Error Deleting Review", error});
    }
}


module.exports = {
    handleAddReview,
    handleGetPropertyReview,
    handleUpdateReviewByID,
    handleDeleteReviewByID
};
