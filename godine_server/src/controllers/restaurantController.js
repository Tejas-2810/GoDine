const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinaryConfig');



exports.createRestaurant = async (req, res) => {
  try {
    const jsonData = JSON.parse(req.body.data); 
    console.log(jsonData);

    const uploadMenuPromises = req.files['menu'].map(file =>
      cloudinary.uploader.upload(file.path)
    );
    const uploadPhotosPromises = req.files['photos'].map(file =>
      cloudinary.uploader.upload(file.path)
    );

    const menuUploadResults = await Promise.all(uploadMenuPromises);
    const photosUploadResults = await Promise.all(uploadPhotosPromises);
    const restaurantData = {
      ...jsonData,
      menu: menuUploadResults.map(result => result.secure_url),
      photos: photosUploadResults.map(result => result.secure_url),
    };

    const newRestaurant = await Restaurant.create(restaurantData);
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllRestaurantsForHomePage = async (req,res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurantReviews = async (req, res) => {
  const restaurantID = req.params.restaurantID;

  try {
    const averageRating = await Review.aggregate([
      { $match: { restaurantID: new mongoose.Types.ObjectId(restaurantID) } }, // Use 'new' keyword here
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);

    const reviewCount = await Review.countDocuments({ restaurantID });

    const reviews = await Review.find({ restaurantID })
      .populate({ path: 'userID', select: 'name' }) 
      .select('userID review');

    res.status(200).json({
      averageRating: averageRating.length > 0 ? averageRating[0].averageRating : 0,
      reviewCount,
      reviews
    });
  } catch (error) {
    console.error('Error fetching restaurant reviews:', error);
    res.status(500).json({ message: 'Error fetching restaurant reviews' });
  }
};


