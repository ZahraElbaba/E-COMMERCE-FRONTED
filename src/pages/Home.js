import React from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import AboutUs from "../components/AboutUs";



const Home = () => {
    return (
        <>
            <Header />
            <Landing />
            <ProductCard />
            <AboutUs />
            <Footer/>
        </>
    );
};

export default Home;
