


import React from "react";
import '../styles/AboutUs.css'
import AboutPic from '../assets/images/AboutPic.svg';// Adjust the path if needed

const AboutUs = () => {
  return (
    <section className="about-container">
      <div className="about-content">
        {/* Watch Image */}
        <img src={AboutPic} alt="Luxury Watch" className="about-image" />

        {/* About Text */}
        <div className="about-text">
          <h2 className="about-title">ABOUT US</h2>
          <p className="about-description">
            From they fine john he give of rich he. They age and draw mrs like.
            Improving end distrusts may instantly was household applauded
            incommode. Why kept very ever home mrs. Considered sympathize ten
            uncommonly occasional assistance sufficient not.
          </p>
          <button className="about-button">EXPLORE MORE</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
