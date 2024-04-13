import React, { useState } from "react";
import "./payment.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { getUserId } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const randomTotalPrice = Math.floor(Math.random() * (300 - 200 + 1) + 10);
  const [totalPrice, setTotalPrice] = useState(`${randomTotalPrice} CAD`);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1-")
      .substring(0, 19);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(formatCardNumber(event.target.value));
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value.replace(/\D/g, "").substring(0, 3));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleExpiryDateChange = (date) => {
    setExpiryDate(date);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    console.log("Hnd");
  };

  const handlePayment = async () => {
    if (paymentMethod === "creditCard") {
      const emailRegex = /\S+@\S+\.\S+/;
      const card = cardNumber.replace(/-/g, "");

      if (card.length !== 16) {
        alert("Invalid card number (must be 16 digits)");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
      }

      if (cvv.length !== 3) {
        alert("Invalid CVV format (must be 3 digits)");
        return;
      }

      const formattedExpiryDate = `${expiryDate.getMonth() + 1}/${
        expiryDate.getFullYear() % 100
      }`;

      console.log("Payment Info:", {
        card,
        cvv,
        expiryDate: formattedExpiryDate,
        email,
      });

      alert("Payment Successful!!!");

      navigate("/history");
    } else if (paymentMethod === "interac") {
      const emailRegex = /\S+@\S+\.\S+/;
      console.log("Interac Payment Info:", {
        email,
      });

      if (!emailRegex.test(email)) {
        alert("Invalid email format");
        return;
      }
    }
    //navigate("/email-confirmation");
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <div className="pcontainer">
      <div className="payment-card">
        <div className="main">GoDine</div>

        <div className="total-price">
          {" "}
          <b>Total Price: </b> {totalPrice}
        </div>

        <select
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          className="payment-method-selector"
        >
          <option value="creditCard">Credit Card/Debit Card</option>
        </select>
        {paymentMethod === "creditCard" && (
          <>
            <div className="cards_image">
              {/* <img src={cardLogos} alt="Card Types" /> */}
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email ID *"
              className="section1"
              required
            />
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Card Number *"
              maxLength="19"
              required
            />
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV *"
              maxLength="3"
              required
            />
            <DatePicker
              selected={expiryDate}
              onChange={handleExpiryDateChange}
              dateFormat="MM/yy"
              showMonthYearPicker
              minDate={new Date(currentYear, currentMonth)}
              className="section1"
            />
          </>
        )}
        {paymentMethod === "interac" && (
          <>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email ID *"
              className="section1"
              required
            />
          </>
        )}
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
}

export default Payment;
