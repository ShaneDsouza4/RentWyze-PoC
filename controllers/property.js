const Property = require('../models/property');

async function handleCreateProperty(req, res){
    try{
        const { name, propertyType, address, bedrooms, bathrooms, squareFeet, amenities, landlord } = req.body;

        const property = await Property.create({
            name, 
            propertyType, 
            address, 
            bedrooms, 
            bathrooms, 
            squareFeet, 
            amenities, 
            landlord
        })

        return res.status(201).json({msg:"Property created sucessfully", property});
    }catch(error){
        return res.status(500).json({msg:"Error creating property", error});
    }  
}


module.exports = {
    handleCreateProperty
}