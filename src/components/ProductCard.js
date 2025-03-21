import React from "react";
import "../styles/ProductCard.css";
import HomePic2 from '../assets/images/HomePic2.svg';
import HomePic3 from '../assets/images/HomePic3.svg';
import HomePic4 from '../assets/images/HomePic4.svg';
import HomePic5 from '../assets/images/HomePic5.svg';
import HomePic6 from '../assets/images/HomePic6.svg';
import HomePic7 from '../assets/images/HomePic7.svg';

const topProducts = [
  {
    id: 1,
    name: "SEADWELLER",
    price: "$22,000",
    image: HomePic2,
  },
  {
    id: 2,
    name: "SUBMARINER",
    price: "$22,000",
    image: HomePic3,
  },
  {
    id: 3,
    name: "SUBMARINER",
    price: "$22,000",
    image: HomePic4,
  },
];

const bottomProducts = [
  {
    id: 1,
    name: "SPIRIT ROSE",
    price: "$1500",
    image: HomePic5, // Replace with actual image URL
  },
  {
    id: 2,
    name: "FOSIL ME3",
    price: "$650",
    image: HomePic6,
  },
  {
    id: 3,
    name: "DUCHEN",
    price: "$950",
    image: HomePic7,
  },
];

const ProductCard = () => {
  return (
    <div className="product-container">
      {/* Top Section */}
      <p className="sub-text">Find your favourite smart watch.</p>
      <h2 className="section-title">Our Latest Products</h2>
      <div className="product-list">
        {topProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            {product.price && <p className="product-price">{product.price}</p>}
          </div>
        ))}
      </div>

      <button className="view-more">View More</button>

      {/* Bottom Section */}
      <h2 className="section-title">More Watches for You</h2>
      <div className="product-list">
        {bottomProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>

      <button className="view-more">View More</button>
    </div>
  );
};

export default ProductCard;
