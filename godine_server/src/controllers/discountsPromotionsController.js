const Discount = require('../models/discount');
const Promotions = require('../models/promotions');

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate('eligibleRestaurants');
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discounts: " + error.message });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.discountId).populate('eligibleRestaurants');
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discount: " + error.message });
  }
};


exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotions.find().populate('restaurantID');
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching promotions: " + error.message });
  }
};

exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotions.findById(req.params.promotionId).populate('restaurantID');
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: "Error fetching promotion: " + error.message });
  }
};