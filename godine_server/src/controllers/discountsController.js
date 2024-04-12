const Discount = require('../models/discount');

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate('eligibleRestaurants').exec();
    console.log(discounts);
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discounts: " + error.message });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.discountId).populate('eligibleRestaurants').exec();
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discount: " + error.message });
  }
};
