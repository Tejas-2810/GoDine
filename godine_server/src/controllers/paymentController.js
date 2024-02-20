const Payment = require("../models/payment");

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPayment = async (req, res) => {
  const { userID, reservationID, amount, paymentMethod } = req.body;

  const newPayment = new Payment({
    userID,
    reservationID,
    amount,
    paymentMethod,
  });

  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPaymentByID = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentID);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
