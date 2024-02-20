const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// POST sending newsletters 
router.post('/send', newsletterController.sendNewsletters);

module.exports = router;
