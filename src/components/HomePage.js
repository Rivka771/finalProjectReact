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
  <div className="products-grid">
    {products.map((product) => (
      <div
        key={product.id}
        onClick={() => handleProductClick(product.id)}
        className="product-card"
      >
        <img
          src={product.image}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <p>מחיר: {product.price} ₪</p>
      </div>
    ))}
  </div>
);



}
