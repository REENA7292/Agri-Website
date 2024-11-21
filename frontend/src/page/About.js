import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Main Heading */}
      <h1 className="about-title">About Us</h1>

      {/* Introduction Section */}
      <div className="about-intro">
        <p className="about-paragraph">
          Welcome to our website! We are committed to delivering exceptional
          products and services tailored to your needs.
        </p>
        <p className="about-paragraph">
          Our mission is to achieve excellence through a dedication to customer
          satisfaction, continuous improvement, and innovation.
        </p>
      </div>

      

      {/* Our Vision Section */}
      <div className="about-section">
        <h2 className="about-section-title">Our Vision</h2>
        <p className="about-paragraph">
          Our vision is to be the leading provider of innovative solutions in
          our industry. We aim to continuously improve and stay ahead of the
          curve, ensuring that our customers receive the best experience
          possible.
        </p>
      </div>

      {/* Our Team Section */}
      <div className="about-section">
        <h2 className="about-section-title">Our Team</h2>
        <p className="about-paragraph">
          Meet our passionate and skilled team, working tirelessly to provide a
          seamless experience for you. Together, we strive to set benchmarks in
          service quality.
        </p>
        {/* Optional: Add team member details or images */}
      </div>

      {/* Contact Us Section */}
      <div className="about-section">
        <h2 className="about-section-title">Contact Us</h2>
        <p className="about-paragraph">
          We value open communication and would love to hear from you. Whether
          you have questions, feedback, or suggestions, feel free to reach out
          to us at any time.
        </p>
        <p className="about-paragraph">
          <strong>Email:</strong> support@example.com <br />
          <strong>Phone:</strong> (123) 456-7890 <br />
          <strong>Address:</strong> 123 Main St, City, Country
        </p>
      </div>

      {/* Social Media Section */}
      <div className="about-section">
        <h2 className="about-section-title">Connect With Us</h2>
        <div className="social-icons">
          <FontAwesomeIcon icon={faTwitter} className="icon" />
          <FontAwesomeIcon icon={faFacebook} className="icon" />
          <FontAwesomeIcon icon={faInstagram} className="icon" />
        </div>
      </div>
    </div>
  );
};

export default About;
