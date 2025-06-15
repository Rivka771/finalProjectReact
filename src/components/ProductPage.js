import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductPage({ user, setUser }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  console.log("id =", id);
  if (!id) return;
  fetch(`http://localhost:3001/products/${id}`)
    .then(res => res.json())
    .then(data => setProduct(data))
    .catch(e => console.error(e));
}, [id]);

  const handlePurchase = () => {
    if (!user || !product?.id) {
      alert("בעיה בזיהוי המשתמש או המוצר. אנא נסי שוב.");
      return;
    }

    const updatedPurchases = [...(user.purchases || []), {
      productId: product.id,
      quantity: Number(quantity)
    }];

    const updatedUser = { ...user, purchases: updatedPurchases };

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ purchases: updatedPurchases })
    })
      .then(() => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/profile");
        }, 2500);
      });
  };  // <-- סוגר את הפונקציה handlePurchase

  if (!product) return <div>טוען מוצר...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">{product.name}</h2>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="mb-2">מחיר כרטיס: {product.price} ₪</p>

      <input
        type="number"
        placeholder="כמות כרטיסים"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="מספר כרטיס אשראי"
        value={cardNumber}
        onChange={e => setCardNumber(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="תוקף (MM/YY)"
        value={expiry}
        onChange={e => setExpiry(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={e => setCvv(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button onClick={handlePurchase} className="w-full bg-blue-600 text-white p-2 rounded">רכוש</button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2">הרכישה בוצעה בהצלחה!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
