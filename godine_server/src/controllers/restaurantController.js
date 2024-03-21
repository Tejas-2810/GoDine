const Restaurant = require('../models/restaurant');
const fs = require('fs');
const path = require('path');

function renameAndSaveFile(file, prefix) {
  const newName = prefix + '-' + file.originalname;
  const newFilePath = path.join('uploads', newName);
  fs.renameSync(file.path, newFilePath);
  return newFilePath;
}

exports.createRestaurant = async (req, res) => {
  try {
    
    if (req.user.role !== 'restaurant owner') {
      return res.status(403).json({ message: 'Only users with the role of "restaurant owner" can create restaurants.' });
    }

    const restaurantData = {
      ...req.body,
      owner: req.user._id, 
      menu: undefined, 
      photos: []
    };

   
    if (req.files.menu && req.files.menu.length) {
      const menuFile = req.files.menu[0];
      restaurantData.menu = renameAndSaveFile(menuFile, restaurantData.restaurantName.replace(/\s+/g, '_'));
    }


    if (req.files.photos) {
      restaurantData.photos = req.files.photos.map(photo => 
        renameAndSaveFile(photo, restaurantData.restaurantName.replace(/\s+/g, '_'))
      );
    }


    const newRestaurant = await Restaurant.create(restaurantData);
    res.status(201).json({ success: true, data: newRestaurant });
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMyRestaurants = async (req, res) => {
  try {

    const ownerRestaurants = await Restaurant.find({ owner: req.user._id });
    res.status(200).json(ownerRestaurants);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch restaurants: " + error.message });
  }
};



exports.updateRestaurantById = async (req, res) => {
  try {
    
    const restaurant = await Restaurant.findById(req.params.restaurantID);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User is not the owner of this restaurant' });
    }

    
    if (req.files.menu) {
      const menuFile = req.files.menu[0];
      req.body.menu = menuFile.path;  
    }

    if (req.files.photos) {
      req.body.photos = req.files.photos.map(photo => photo.path); 
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantID, req.body, { new: true });
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantID);
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


