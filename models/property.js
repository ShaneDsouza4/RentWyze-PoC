const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
    name: { 
        type: String, 
        required: false
    },
    propertyType: {
        type: String,
        enum: ["House", "Apartment", "Basement"],
        required: false
    },
    address: { 
        street:{
            type: String, 
            required: false
        },
        city: { 
            type: String, 
            required: false
        },
        province: { 
            type: String, 
            required: false
        },
        postalCode: { 
            type: String, 
            required: false
        }
    },
    bedrooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    squareFeet: {
        type: Number
    },
    amenities: [{
        type: String
    }],
    landlord: { 
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    propertyImages:[{
        type:String
    }],
    price:{
        type: Number,
        required: false
    },
    downPayment:{
        type:String,
    },
    keyDeposit:{
        type:String,
    },
    agreementType:{
        type: String
    },

}, { timestamps: true });

propertySchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Property = model('property', propertySchema);

module.exports = Property;