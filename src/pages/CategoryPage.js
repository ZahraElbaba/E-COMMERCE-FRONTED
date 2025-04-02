import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        // ✅ Load from sessionStorage if available
        const cachedData = sessionStorage.getItem(`category-${categoryId}`);
        if (cachedData) {
            setProducts(JSON.parse(cachedData));
        } else {
            fetch(`http://localhost:4000/api/products/category/${categoryId}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.data);
                    sessionStorage.setItem(`category-${categoryId}`, JSON.stringify(data.data)); // ✅ Store for persistence
                })
                .catch((error) => console.error("Error fetching products:", error));
        }
    }, [categoryId]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                {categoryId === "1" ? "For Him" : "For Her"}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {visibleCount < products.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;