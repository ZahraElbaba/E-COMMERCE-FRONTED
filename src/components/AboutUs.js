// import React from "react";
// import AboutPic from '../assets/images/AboutPic.svg'; // Adjust the path if needed

// const AboutUs = () => {
//   return (
//     <section className="flex justify-center items-center py-16 px-5 bg-white">
//       <div className="flex flex-col md:flex-row items-center max-w-5xl gap-10">
        
//         {/* Watch Image */}
//         <img src={AboutPic} alt="Luxury Watch" className="w-72 md:w-80 h-auto" />

//         {/* About Text */}
//         <div className="max-w-md text-left md:text-left">
//           <h2 className="text-3xl font-bold mb-4 text-black">ABOUT US</h2>
//           <p className="text-gray-600 text-lg leading-relaxed mb-6">
//             From they fine john he give of rich he. They age and draw mrs like.
//             Improving end distrusts may instantly was household applauded
//             incommode. Why kept very ever home mrs. Considered sympathize ten
//             uncommonly occasional assistance sufficient not.
//           </p>
//           <button className="bg-black text-white px-6 py-3 text-lg rounded-md transition-transform transform hover:scale-105">
//             EXPLORE MORE
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;


import React, { forwardRef } from "react";
import AboutPic from '../assets/images/AboutPic.svg'; // Adjust the path if needed

const AboutUs = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="flex justify-center items-center py-16 px-5 bg-white">
      <div className="flex flex-col md:flex-row items-center max-w-5xl gap-10">
        
        {/* Watch Image */}
        <img src={AboutPic} alt="Luxury Watch" className="w-72 md:w-80 h-auto" />

        {/* About Text */}
        <div className="max-w-md text-left md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-black">ABOUT US</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From they fine john he give of rich he. They age and draw mrs like.
            Improving end distrusts may instantly was household applauded
            incommode. Why kept very ever home mrs. Considered sympathize ten
            uncommonly occasional assistance sufficient not.
          </p>
          <button className="bg-black text-white px-6 py-3 text-lg rounded-md transition-transform transform hover:scale-105">
            EXPLORE MORE
          </button>
        </div>
      </div>
    </section>
  );
});

export default AboutUs;
