const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController'); // Adjust the path as necessary


router.post('/', restaurantController.createRestaurant);

router.get('/', restaurantController.getAllRestaurants);

router.get('/:restaurantID', restaurantController.getRestaurantById);

router.put('/:restaurantID', restaurantController.updateRestaurantById);

router.delete('/:restaurantID', restaurantController.deleteRestaurantById);

module.exports = router;
