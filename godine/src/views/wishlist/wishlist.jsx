import React from "react";
import RestaurantsList from '../../components/wishlist/RestaurantsList';
import '../../components/wishlist/RestaurantCard.css'
const restaurants = [
    
        {
          "id": 1,
          "imageUrl": "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww",
          "name": "Gourmet Bites",
          "rating": 4.5,
          "tags": ["Italian", "Pizza", "Vegetarian"]
        },
        {
          "id": 2,
          "imageUrl": "https://media.istockphoto.com/id/843610508/photo/interior-of-cozy-restaurant-loft-style.jpg?s=612x612&w=0&k=20&c=s_PVQJNzcilxKYpm3O-AxBMx4_om5G0TKuxUmiMl85Y=",
          "name": "Ocean's Delight",
          "rating": 4.8,
          "tags": ["Seafood", "Fine Dining"]
        },
        {
          "id": 3,
          "imageUrl": "https://media.cntraveler.com/photos/5a931002d363c34048b35bf5/master/w_320%2Cc_limit/Motoyoshi_2018__DSC5176.jpg",
          "name": "The Curry House",
          "rating": 4.2,
          "tags": ["Indian", "Spicy", "Vegan Options"]
        },
        {
          "id": 4,
          "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7GdDoIBupJln8MPs0tByH0JPDabG2zF0F6w&usqp=CAU",
          "name": "Beijing Express",
          "rating": 4.0,
          "tags": ["Chinese", "Noodles", "Quick Bites"]
        },
        {
          "id": 5,
          "imageUrl": "https://w0.peakpx.com/wallpaper/821/32/HD-wallpaper-beautiful-wood-lined-restaurant-r-tables-window-restaurant-chairs-r.jpg",
          "name": "El Mexicano",
          "rating": 4.3,
          "tags": ["Mexican", "Tacos", "Gluten Free Options"]
        },
        {
          "id": 6,
          "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuT9tc_FRLkw0t-5KqibtXlskSf1xYqwbl2Q&usqp=CAU",
          "name": "The Green Leaf",
          "rating": 4.6,
          "tags": ["Vegetarian", "Organic", "Salads"]
        },
        {
          "id": 7,
          "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ZoETXY0T-MxJAnBYToMggNoOs5NmkHjh9Q&usqp=CAU",
          "name": "Burger Town",
          "rating": 3.9,
          "tags": ["American", "Burgers", "Fast Food"]
        },
        {
          "id": 8,
          "imageUrl": "https://resizer.otstatic.com/v2/photos/wide-mlarge/2/43647767.webp",
          "name": "Sushi World",
          "rating": 4.7,
          "tags": ["Japanese", "Sushi", "Fine Dining"]
        },
        {
          "id": 9,
          "imageUrl": "https://media.istockphoto.com/id/1406684925/photo/multiracial-friends-at-the-dinner-at-the-beach-restaurant-during-sunset.jpg?s=612x612&w=0&k=20&c=_-RlzdaQ0M0BsJ-bu-Rb3NbM_KZd8Wv26R7QUon6DO0=",
          "name": "Pasta Paradise",
          "rating": 4.4,
          "tags": ["Italian", "Pasta", "Vegetarian Friendly"]
        },
        {
          "id": 10,
          "imageUrl": "https://media.istockphoto.com/id/1322274374/photo/beach-bar-and-night-clubs-at-tropical-island-koh-phangan-thailand.jpg?s=612x612&w=0&k=20&c=OwrhkyMCdewdSZLziz5UKLaBQClkzmahMeTV_u2XuY8=",
          "name": "French Feast",
          "rating": 4.9,
          "tags": ["French", "Fine Dining", "Gourmet"]
        }
      
      
      
];
const WishList = () => {
    return (
        <div className="pcontainer">
            <h1 className="wishlist-header">Wishlist Restaurants</h1>
            <RestaurantsList restaurants={restaurants} />
        </div>
    );
};

export default WishList;