const express = require('express');
const multer = require('multer');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { checkAuth } = require('../middlewares/authMiddleware');

// Restaurant Dashboard
router.get('/myrestaurants', checkAuth, restaurantController.getMyRestaurants);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/createRestaurants', checkAuth, upload.fields([
  { name: 'menu', maxCount: 1 },
  { name: 'photos', maxCount: 5 }
]), restaurantController.createRestaurant);

router.put(
    '/updateRestaurant/:restaurantID', 
    checkAuth, 
    upload.fields([
      { name: 'menu', maxCount: 1 },
      { name: 'photos', maxCount: 5 }
    ]),
    restaurantController.updateRestaurantById
  );


router.put('/:restaurantID', restaurantController.updateRestaurantById);


// Restaurant Page
router.get('/:restaurantID', restaurantController.getRestaurantById);

//Home page
router.get('/', restaurantController.getAllRestaurantsForHomePage);
module.exports = router;

