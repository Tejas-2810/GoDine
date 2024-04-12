const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        until: {
            type: Date,
            required: true,
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants",
        },
    },
    {
        timestamps: true,
        collection: "Promotions"
    }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;