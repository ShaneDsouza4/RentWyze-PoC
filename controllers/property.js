const Property = require('../models/property');
const Review = require("../models/reviews");

async function handleCreateProperty(req, res){
    try{
        //console.log(req.body)
        //console.log(req.files)
        const { name, propertyType, address, bedrooms, bathrooms, squareFeet, amenities, landlord, description, price, downPayment, keyDeposit, agreementType } = req.body;
        let imageUrls = [];
        if (req.files) {
            imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        }
        const property = await Property.create({
            name, 
            propertyType, 
            address, 
            bedrooms, 
            bathrooms, 
            squareFeet, 
            amenities, 
            landlord,
            description, 
            price, 
            downPayment, 
            keyDeposit, 
            agreementType,
            propertyImages: imageUrls
        })

        return res.status(201).json({msg:"Property created sucessfully", property});
    }catch(error){
        console.log("Create Property Error: ", error);
        return res.status(500).json({msg:"Error creating property", error});
    }  
}

async function handleGetAllProperties(req, res) {
    try{
        const allDBProperties = await Property.find({});
        const propertyCount = allDBProperties.length;
        return res.status(200).json({propertyCount, allDBProperties});
    }catch(error){
        return res.status(500).json({msg:"Error getting all properties", error});
    }
    
}

async function handlegetPropertyByID(req, res){
    try{
        const property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({msg:"No property found."});
        }
        
        const reviews = await Review.find({ property_id: req.params.id }).populate('tenant_id', 'firstName lastName').sort({ created_at: -1 }); 
        return res.status(200).json({msg:"success", property, reviews});
    }catch(error){
        return res.status(500).json({msg:"error getting property", error});
    }
}

async function handleupdatePropertyByID(req, res) {
    try{
        const property = await Property.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({msg:"success", property});
    }catch(error){
        return res.status(500).json({msg:"error updating property", error});
    }
}

async function handleDeletePropertyID(req, res) {
    try{
        await Property.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"Property Delete Success!"});
    }catch(error){
        return res.status(500).json({msg:"Error Deleting Property", error});
    }
}

async function handleGetPropertyFilter(req, res){
    try{
        const { text, propertyType, province, price, squareFeet } = req.body;
        let query = {};

        if (text) {
            query.$or = [
                { name: { $regex: text, $options: 'i' } },
                { propertyType: { $regex: text, $options: 'i' } },
                { description: { $regex: text, $options: 'i' } },
                { "address.street": { $regex: text, $options: 'i' } },
                { "address.city": { $regex: text, $options: 'i' } },
                { "address.province": { $regex: text, $options: 'i' } }
            ];
        }

        if (propertyType) {
            query.propertyType = propertyType;
        }

        if (province) {
            query.province = province;
        }

        if (price) {
            query.price = {};
            if (price.min) query.price.$gte = price.min;
            if (price.max) query.price.$lte = price.max;
        }

        if (squareFeet) {
            query.squareFeet = {};
            if (squareFeet.min) query.squareFeet.$gte = squareFeet.min;
            if (squareFeet.max) query.squareFeet.$lte = squareFeet.max;
        }

        const properties = await Property.find(query);
        return res.status(200).json(properties);
    }catch(error){
        return res.status(500).json({msg:"error getting filtered property", error});
    }
    }

module.exports = {
    handleCreateProperty,
    handleGetAllProperties,
    handlegetPropertyByID,
    handleupdatePropertyByID,
    handleDeletePropertyID,
    handleGetPropertyFilter
}