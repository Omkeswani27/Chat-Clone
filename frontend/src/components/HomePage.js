import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Custom CSS for hover effects

const Footer = () => {
  return (
    <footer className="custom-footer text-white pt-4 pb-2">
      <div className="container text-center">
        <p className="text-sm mb-3">2023 QuickChat. All rights reserved.</p>
        <ul className="list-inline mb-3">
          <li className="list-inline-item">
            <a href="#" className="text-white hover-link no-underline">Terms of Service</a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white hover-link no-underline">Privacy Policy</a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="text-white hover-link no-underline">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="#">
          QuickChat
          </a>
          <div className="d-flex ms-auto">
            <a className="nav-link text-white hover-effect" href="/login">
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center animated fadeInUp">
          <h1 className="display-3 fw-bold text-gradient">Connect, Chat, and Collaborate</h1>
          <p className="lead">Your personal messaging platform for seamless conversations.</p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
