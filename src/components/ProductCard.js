import React from "react";
import { useNavigate } from "react-router-dom";
import HomePic2 from '../assets/images/HomePic2.svg';
import HomePic3 from '../assets/images/HomePic3.svg';
import HomePic4 from '../assets/images/HomePic4.svg';
import HomePic5 from '../assets/images/HomePic5.svg';
import HomePic6 from '../assets/images/HomePic6.svg';
import HomePic7 from '../assets/images/HomePic7.svg';

const topProducts = [
  { id: 1, name: "SEADWELLER", price: "$22,000", image: HomePic2 },
  { id: 2, name: "SUBMARINER", price: "$22,000", image: HomePic3 },
  { id: 3, name: "SUBMARINER", price: "$22,000", image: HomePic4 },
];

const bottomProducts = [
  { id: 1, name: "SPIRIT ROSE", price: "$1500", image: HomePic5 },
  { id: 2, name: "FOSIL ME3", price: "$650", image: HomePic6 },
  { id: 3, name: "DUCHEN", price: "$950", image: HomePic7 },
];

const ProductCard = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-10 px-5 max-w-6xl mx-auto">
      {/* Top Section */}
      <p className="text-indigo-500 text-sm mb-1">Find your favourite smart watch.</p>
      <h2 className="text-2xl font-bold mb-5">Our Latest Products</h2>

      <div className="flex justify-center flex-wrap gap-8">
        {topProducts.map((product) => (
          <div key={product.id} className="text-center w-60">
            <img src={product.image} alt={product.name} className="w-44 h-auto mb-3 mx-auto" />
            <p className="text-lg font-semibold">{product.name}</p>
            {product.price && <p className="text-lg font-bold text-gray-700">{product.price}</p>}
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/category/for-him")} className="mt-6 bg-black text-white px-6 py-3 text-lg rounded-md transition-transform transform hover:scale-105">
        View More
      </button>

      {/* Bottom Section */}
      <h2 className="text-2xl font-bold mt-12 mb-5"></h2>
      <div className="flex justify-center flex-wrap gap-8">
        {bottomProducts.map((product) => (
          <div key={product.id} className="text-center w-60">
            <img src={product.image} alt={product.name} className="w-44 h-auto mb-3 mx-auto" />
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-lg font-bold text-gray-700">{product.price}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/category/for-her")} className="mt-6 bg-black text-white px-6 py-3 text-lg rounded-md transition-transform transform hover:scale-105">
        View More
      </button>
    </div>
  );
};

export default ProductCard;
