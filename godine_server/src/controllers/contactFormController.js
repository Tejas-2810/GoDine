const Contact = require('../models/contact');
const User = require('../models/users'); 

exports.createContactInquiry = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId);

    if (!req.user) {
        return res.status(403).json({ message: 'You must be logged in to submit an inquiry.' });
      }


    const contactInquiry = await Contact.create({
      ...req.body,
      userType: user.role
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
      data: contactInquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting your inquiry: ' + error.message
    });
  }
};