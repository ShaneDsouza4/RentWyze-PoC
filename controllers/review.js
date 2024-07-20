const express = require('express');
const router = express.Router();
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

        return res.status(201).json({msg:"Review created sucessfully", newReview});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating review" });
    }
}

module.exports = router;
