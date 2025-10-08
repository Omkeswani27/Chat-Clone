import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUsPage = () => {
  return (
    <div className="container mt-5 mb-12">
      <h1 className="text-center mb-4">About Us</h1>
      <p className="text-lg text-center text-gray-600 mb-6">
        Welcome to our chat app, where we strive to provide a seamless and enjoyable communication experience for our users.
      </p>
      <div className="row mb-6">
        <div className="col-md-4 mb-4">
          <h2 className="h5 font-weight-bold text-gray-900 mb-2">Our Mission</h2>
          <p className="text-lg text-gray-600">
            Our mission is to connect people from all over the world and facilitate meaningful conversations.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h2 className="h5 font-weight-bold text-gray-900 mb-2">Our Values</h2>
          <p className="text-lg text-gray-600">
            We value honesty, integrity, and respect for all individuals. We strive to create a safe and inclusive environment for our users.
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h2 className="h5 font-weight-bold text-gray-900 mb-2">Our Team</h2>
          <p className="text-lg text-gray-600">
            Our team consists of passionate and dedicated individuals who are committed to delivering the best possible experience for our users.
          </p>
        </div>
      </div>
      <p className="text-lg text-center text-gray-600 mb-6">
        Thank you for choosing our chat app. We hope you enjoy using it and look forward to hearing your feedback.
      </p>
    </div>
  );
};

export default AboutUsPage;
