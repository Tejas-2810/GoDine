import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./newsletter.css";
import newsletter1 from "./../../images/newsletter1.png";
import newsletter2 from "./../../images/newsletter2.png";
import newsletter3 from "./../../images/newsletter3.png";
import newsletter4 from "./../../images/newsletter4.png";
import newsletter5 from "./../../images/newsletter5.png";
import newsletter6 from "./../../images/newsletter6.png";

const newsletterContents = {
  1: `My previous quest for the ultimate bread in Greater Vancouver was so much fun that I thought I would do it again for another one of my favourite treats. Almond croissants have long been my go-to at cafes and bakeries. Sure, they are not as pure as a classic croissant but the almond variant is my preference. This hyper-local list is no casual walkthrough of the prettiest photos on Instagram. I actually ate and ranked every almond croissant that appears. Nothing was prepared especially for me. Almond Croissant Guide Vancouver
  The Criteria:
I am on a constant search for the best almond croissant amongst the plethora of bakeries in Greater Vancouver. This is a ranked list of my own tasting preferences. There will be a winner, two runner-ups, a cutoff for the ones I'd recommend, and many losers. To start off, here is my criteria for a good almond croissant:
Must have a good rise 
Must have enough almond on top and within. I'm not here for a sprinkling of nuts
Must have a good balance of sweetness, nuttiness, and buttery croissant-ness
Must break into satisfying flakes on impact with my teeth`,
  2: `When an fancy concept restaurant opens in Vancouver, it's needs to do something special in order to stand out and distinguish itself from the plethora of fine dining options. Thankfully, that's exactly what Collective Hospitality has executed with the opening of their third restaurant. In this review, I am biased. I have already spent time in The Mackenzie Room and Say Mercy! Both had their unique twists, and "French-ish" is the parallel twist at Collective Good Bistro. You can deliberate between a tasting menu or order a la carte, which I love about dining in this family of restaurants, and tonight's meal was another satisfying victory for the local Vancouver scene.

Collective Goods in Vancouver – Gnocchi Parisienne
Food:
Team Tastic came for an early Sunday dinner and I had a great taste of the following:

Salmon "Meunière" ($20)
Gnocchi Parisienne ($41)
Duck ($46)
The salmon "meunière" was a succulent and tender starter. The king salmon had a ton of fattiness, and when mixed in with fried caper berries, lemon caper vinaigrette, and candied black pepper lemon, was a playful appetizer that left me with a tart finish and a feeling of great anticipation for the rest of the meal.`,

  3: `I am the type of person to consider giving a Japanese snack box as a gift so it's a little strange to be on the other end of receiving not one but TWO boxes from Sakuraco and TokyoTreats to try. While both are filled with Japanese snacks, the branding and snack contents are made for slightly different audiences. Both boxes are the same price points for all subscription levels and guarantee the delivery of authentic Japanese for your friends and loved ones. Join me in my discovery of both boxes this holiday season to see what's inside.

Sakuraco Subscription Box
Sakuraco Subscription Box
Sakuraco
Sakuraco (starting at $32.50 USD/mo for 12 months) specializes in a refined snack experience. This month's theme was "Holidays in Hokkaido". We're talking rice crackers, yuzu infusions, and straight up Japanese chinaware.`,

  4: `Vancouver has its fair share of taco shops but these are a fast-fry experience whose number one mission is to deliver tortillas and protein into your stomach as fast as possible. Alimentaria Mexicana on Granville Island is a cantina that slows things down and gives diners a chance to try higher quality proteins and entrees. It'll cost more than your average taco shop, but there's nothing else like it in the area. Join me in my visit to Alimentaria Mexicana this past weekend to see if this is the experience for you.

Alimentaria Mexicana – Lamb Belly Barbacoa
Food:
Team Tastic came here for a weekend lunch and I had a great taste of the following:

Rajas Con Queso ($20)
Veg Birria ($21)
Lamb Belly Barbacoa ($33)
The rajas con queso was our appetizer of choice and to be honest, I was hoping for something thicker. Sure, the poblano peppers, onions, crema, and cheese did have a cheesy flavour but it spilled right out of the corn tortillas because the queso was so wet. Maybe opt for the esquites instead if you're looking to share an appetizer.`,

  5: `There are trucks that show up to take your lunch money in exchange for standard items and then there are trucks that are doing something really unique that leave you hoping they can set up a permanent brick-and-mortar location.

 Random Food Truck off the Coquihalla Highway
Random Food Truck off the Coquihalla Highway
This guide looks at the latter with the following strict criteria:
Serving something not immediately available at a restaurant in the same neighbourhood
Is not affiliated with a restaurant with a brick-and-mortar location (sorry Le Tigre)
Is fairly available throughout the year and is not a limited time thing (sorry BBQ trucks at The PNE)
Takeout from ghost kitchens aren't food trucks
 With this criteria in mind, there are both winners and losers because I spent my money and have opinions to share. Note that all prices noted are from the time from my visit and are subject to change`,

  6: `In the vibrant culinary landscape of Vancouver, where Vietnamese eateries often don the monikers of "Pho _____" or embrace names reminiscent of Vietnamese phrases, emerges Wooden Fish — a serene enclave in the heart of West Vancouver's Ambleside neighborhood. Departing from the conventional nomenclature, this establishment derives its name from a profound Buddhist symbol cherished across various Asian cultures. If you're looking for beauty in Vietnamese food, located in a nice neighbourhood, and a hair below the prices of Anh + Chi who are now riding the wave of their Michelin Bib Gourmand designation, this might be a great spot to stop by.`,
};

const newsletterImages = {
  1: newsletter1,
  2: newsletter2,
  3: newsletter3,
  4: newsletter4,
  5: newsletter5,
  6: newsletter6,
};

const Newsletter = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNewsletterId, setSelectedNewsletterId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { getUserId } = useAuth();

  const userId = getUserId();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/newsletter/`,
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
        `http://localhost:8080/api/newsletter/subscribe`,
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
        `http://localhost:8080/api/newsletter/unsubscribe`,
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
      <h1 className="newsletter-header text-center my-4">Newsletters</h1>
      <Row>
        {Object.entries(newsletterImages).map(([id, src]) => (
          <Col md={4} key={id}>
            <Card className="mb-4" onClick={() => handleCardClick(id)}>
              <Card.Img variant="top" src={src} />
              <Card.Body>
                <Card.Title>{`Newsletter ${id}`}</Card.Title>
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
            <Modal.Title>{`Newsletter ${selectedNewsletterId}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{newsletterContents[selectedNewsletterId]}</Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default Newsletter;
