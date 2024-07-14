const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord'},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: { type: Number, default: 0 },
});

const Property = model('property', propertySchema);

module.exports = Property;