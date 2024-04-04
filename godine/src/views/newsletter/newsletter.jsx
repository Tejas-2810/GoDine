import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./newsletter.css";
import newsletter1 from "./../../images/newsletter1.webp";
import newsletter2 from "./../../images/newsletter2.webp";
import newsletter3 from "./../../images/newsletter3.webp";
import newsletter4 from "./../../images/newsletter4.webp";
import newsletter5 from "./../../images/newsletter5.webp";
import newsletter6 from "./../../images/newsletter6.webp";

const newsletterContents = {
  1: `As the leaves change color and the air turns crisp, our menu undergoes its own transformation. This season, we're thrilled to introduce an array of dishes inspired by autumn's rich palette and flavors. Dive into the comforting embrace of our pumpkin spice risotto, or savor the delicate balance of our roasted duck with a cranberry glaze. Each dish is crafted with locally sourced ingredients, bringing the harvest to your table. Join us for a culinary journey that celebrates the very essence of fall. Don't wait to reserve your table — these seasonal specialties are here for a limited time only.`,
  2: `This month, we're giving you a peek behind the curtain with an exclusive recipe from our esteemed Chef Maria. Known for her innovative use of traditional ingredients, Chef Maria shares her secret to the perfect beef bourguignon, a comforting dish that's perfect for the cooler weather. With a detailed guide and expert tips, you'll be able to recreate a taste of our kitchen in your own home. Impress your guests or treat your family to this sumptuous meal. Don't forget, the secret ingredient is always a pinch of love!`,
  3: `Prepare for an enchanting evening as we transform our garden into a dining oasis under the stars. Our upcoming outdoor dining event promises a night of exquisite food, fine wine, and live music, all set against the backdrop of our beautifully lit garden. The evening's menu features a special selection of dishes that perfectly pair with our handpicked wines, promising a gastronomic adventure. Spaces are limited, so be sure to secure your spot for a magical night that celebrates the joy of dining al fresco.`,
  5: `We're excited to announce the launch of our new vegan menu, crafted with creativity and care. Recognizing the growing demand for plant-based options, our chefs have poured their passion into developing a range of dishes that delight the senses without compromise. From our creamy cashew cheese lasagna to our decadent chocolate avocado mousse, each dish is a testament to the versatility and richness of vegan cuisine. Whether you're a long-time vegan or simply curious to explore, our new menu promises a culinary exploration that's as kind to the planet as it is to your palate.`,
  4: `At the heart of our culinary philosophy is a commitment to supporting local farmers and producers. This month, we're excited to spotlight the heroes who supply us with the freshest and finest ingredients. Join us for a special farm-to-table experience, where each dish tells the story of local agriculture and sustainable farming practices. Our specially curated menu highlights the flavors of the region, showcasing the dedication and hard work of our farming partners. Book your table now and be part of a dining experience that honors the local land and its bounty.`,
  6: `Join us for an exclusive evening dedicated to the art of wine. Our upcoming wine tasting event features a selection of exquisite wines from around the globe, carefully paired with artisanal cheeses and gourmet bites. Led by our sommelier, this intimate gathering is an opportunity to deepen your appreciation of wine, learn about different varietals, and discover the stories behind the labels. Spaces for this special event are limited, ensuring a personalized experience for each of our guests. Reserve your spot now and raise a glass to an unforgettable journey through the world of wine.`,
};

const newsletterImages = {
  1: newsletter1,
  2: newsletter2,
  3: newsletter3,
  4: newsletter4,
  5: newsletter5,
  6: newsletter6,
};

const names = {
  1: "Harvest Delights",
  2: "Behind the Apron",
  3: "Enchanted Evenings",
  4: "From Farm to Feast",
  5: "Green Gourmet",
  6: "Vines & Vintages",
};

const Newsletter = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getUserId } = useAuth();
  const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost";
  const server_port = process.env.REACT_APP_SERVER_PORT || "8080";

  const userId = getUserId();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${server_url}:${server_port}/api/newsletter/`,
          { userID: userId },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        const subscriptions = response.data;
        setIsSubscribed(subscriptions.some((sub) => sub.userID === userId));
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const handleSubscribe = async () => {
    try {
      await axios.post(
        `${server_url}:${server_port}/api/newsletter/subscribe`,
        { userID: userId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsSubscribed(true);
      alert("You have successfully subscribed!");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred while subscribing.");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.post(
        `${server_url}:${server_port}/api/newsletter/unsubscribe`,
        { userID: userId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setIsSubscribed(false);
      alert("You have successfully unsubscribed.");
    } catch (error) {
      console.error("Error unsubscribing:", error);
      alert("An error occurred while unsubscribing.");
    }
  };

  const handleCardClick = (id) => {
    setSelectedNewsletterId(id);
    setShowModal(true);
  };

  return (
    <Container className="newsletter-page">
      <h1 className="newsletter-header text-center my-4">
        <b>Top Newsletters of the Month</b>
      </h1>
      <Row>
        {Object.entries(newsletterImages).map(([id, src]) => (
          <Col md={4} key={id}>
            <Card className="mb-4" onClick={() => handleCardClick(id)}>
              <Card.Img variant="top" src={src} />
              <Card.Body>
                <Card.Title>
                  <b>{`${names[id]}`}</b>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        {isSubscribed ? (
          <Button variant="danger" onClick={handleUnsubscribe}>
            Unsubscribe
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubscribe}>
            Subscribe
          </Button>
        )}
      </div>
      {selectedNewsletterId && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{`Newsletter : ${names[selectedNewsletterId]}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{newsletterContents[selectedNewsletterId]}</Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Newsletter;
