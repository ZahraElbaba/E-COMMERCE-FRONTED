const ProductCard = ({ product }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs mx-auto">
        <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover" />
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-black">{product.name}</h2>
          <p className="text-lg text-gray-800">${product.price}</p>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  