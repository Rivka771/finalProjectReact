// components/ProductCard.jsx
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer border rounded p-4 hover:shadow transition">
      <img src={product.image}
  alt={product.name}
  style={{
    width: '1%',
    height: '3px',
    objectFit: 'cover',
    borderRadius: '8px'}}/>
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.price} ₪</p>
    </div>
  );
}
