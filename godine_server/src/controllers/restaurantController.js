const Restaurant = require('../models/restaurant');
const fs = require('fs');
const path = require('path');


exports.createRestaurant = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const jsonData = JSON.parse(req.body.data); 
    console.log(jsonData);
    const restaurantData = {
      ...jsonData,
      menu: req.files['menu'] ? req.files['menu'].map(file => `${baseUrl}/public/upload/${file.filename}`) : [],
      photos: req.files['photos'] ? req.files['photos'].map(file => `${baseUrl}/public/upload/${file.filename}`) : [],
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


