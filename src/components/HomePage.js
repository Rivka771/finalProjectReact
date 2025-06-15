import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ user }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

 const handleProductClick = (id) => {
  if (!user) {
    navigate("/login");
  } else {
    navigate(`/product/${id}`);
  }
};


  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleProductClick(product.id)}
          className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>מחיר: {product.price} ₪</p>
        </div>
      ))}
    </div>
  );
}
