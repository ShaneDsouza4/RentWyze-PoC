const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    propertyType: {
        type: String,
        enum: ["House", "Apartment", "Basement"],
        required: true
    },
    address: { 
        street:{
            type: String, 
            required: true 
        },
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        postalCode: { 
            type: String, 
            required: true 
        }
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    squareFeet: {
        type: Number
    },
    amenities: [{
        type: String
    }],
    landlord: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'
    }
}, { timestamps: true });

propertySchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Property = model('property', propertySchema);

module.exports = Property;