const Property = require('../models/property');

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
        return res.status(200).json(allDBProperties);
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
        return res.status(200).json({msg:"success", property});
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

module.exports = {
    handleCreateProperty,
    handleGetAllProperties,
    handlegetPropertyByID,
    handleupdatePropertyByID,
    handleDeletePropertyID
}