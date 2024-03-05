import './App.css';
import React from 'react';
import Profile from './views/profile/profile';
import Home from './views/home/home';
import Navbar from './components/navbar/navbar';
import Signin from './views/authentication/signin';
import Signup from './views/authentication/signup';
import ForgotPassword from './views/authentication/forgotPassword';
import ResetPassword from './views/authentication/resetPassword';
import WishList from './views/wishlist/wishlist';
import P404 from './views/p404/p404';
import Contact from './views/contact/contact';
import RequireAuth from './utils/RequireAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes >

          {/* public routes */}
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* protect routes */}
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<WishList />} />
          </Route>

          <Route path="*" element={<P404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
