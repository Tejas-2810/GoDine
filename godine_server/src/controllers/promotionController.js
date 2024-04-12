const Promotion = require('../models/promotion');

async function getAllPromotions(req, res) {
    try {
        const promotions = await Promotion.find().populate('restaurant').exec();
        res.status(200).json(promotions)
    } catch (err) {
        console.error("Failed to fetch promotions:", err);
        res.status(500).json({ message: "Error fetching promotions: " + err.message });
    }
}

module.exports = { getAllPromotions }