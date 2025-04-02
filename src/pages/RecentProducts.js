import React, { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RecentProducts = () => {

    return (
        <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Recent Products</h1>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default RecentProducts;