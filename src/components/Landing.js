import React from "react";
import HomePic1 from '../assets/images/HomePic1.svg';

const Landing = () => {
  return (
    <section className="flex flex-wrap justify-center items-center text-left p-12 font-sans">
      {/* Text Content */}
      <div className="flex-1 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Discover Most Suitable Watches</h1>
        <p className="text-gray-600 text-lg">
          Find the best, reliable, and cheap smart watches here. We focus on product quality.
          Here, you can find smart watches of almost all brands. So why are you waiting? Just order now!
        </p>
      </div>

      {/* Image Content */}
      <div className="flex-1 flex justify-center mt-6 md:mt-0">
        <img src={HomePic1} alt="landing" className="max-w-full h-auto rounded-lg" />
      </div>
    </section>
  );
};

export default Landing;

