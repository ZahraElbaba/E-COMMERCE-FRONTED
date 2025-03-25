import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Category = () => {
  const { type } = useParams();

  // Define images based on category type
  const categoryData = {
    "for-him": {
      title: "Watches for Him",
      images: [
        "https://via.placeholder.com/400x250?text=Men+Watch+1",
        "https://via.placeholder.com/400x250?text=Men+Watch+2",
        "https://via.placeholder.com/400x250?text=Men+Watch+3",
      ],
    },
    "for-her": {
      title: "Watches for Her",
      images: [
        "https://via.placeholder.com/400x250?text=Women+Watch+1",
        "https://via.placeholder.com/400x250?text=Women+Watch+2",
        "https://via.placeholder.com/400x250?text=Women+Watch+3",
      ],
    },
  };

  const selectedCategory = categoryData[type];

  return (
    <div>
      <Header />
      <section className="category-page">
        <h2>{selectedCategory?.title || "Category Not Found"}</h2>
        <div className="category-images">
          {selectedCategory?.images.map((img, index) => (
            <img key={index} src={img} alt={`Watch ${index + 1}`} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Category;
