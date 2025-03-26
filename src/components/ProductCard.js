import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full max-w-xs mx-auto">
      <Link to={`/product/${product.id}`}> {/* Add Link here */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-black">{product.name}</h2>
          <p className="text-lg text-gray-800">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
