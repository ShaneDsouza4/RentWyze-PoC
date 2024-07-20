const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    property_id: {
        type: Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
    tenant_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true });

reviewSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const Review = model('review', reviewSchema);

module.exports = Review;
