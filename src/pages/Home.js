

import React, { useRef } from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";
import Footer from "../components/Footer";
import ProductCard2 from "../components/ProductCard2";
import AboutUs from "../components/AboutUs";

const Home = () => {
    const aboutUsRef = useRef(null);

    const scrollToAboutUs = () => {
        if (aboutUsRef.current) {
            aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <Header scrollToAboutUs={scrollToAboutUs} />
            <Landing />
            <ProductCard2 />
            {/* Pass the ref to AboutUs */}
            <AboutUs ref={aboutUsRef} />
            <Footer />
        </>
    );
};

export default Home;
