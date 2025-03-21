import React from "react";
import HomePic1 from '../assets/images/HomePic1.svg';
import '../styles/Landing.css'

const Landing = () => {
    return (
      <section className="landing">
        <div className="text-content">
          <h1>Discover Most Suitable Watches</h1>
          <p>
            Find the best, reliable, and cheap smart watches here.
            We focus on product quality. Here, you can find smart watches of almost all brands.
            So why are you waiting? Just order now!
          </p>
        </div>
        <div className="image-content">
        <img src={HomePic1} alt="landing" />
        </div>
      </section>
    );
  };
  
  export default Landing;
