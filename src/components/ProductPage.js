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
if (
    !quantity || quantity < 1 ||
    !cardNumber.trim() ||
    !expiry.trim() ||
    !cvv.trim()
  ) {
    alert("אנא מלא את כל שדות התשלום לפני הרכישה.");
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
  <div className="purchase-page">
    <h2 className="product-title">{product.name}</h2>
    <img src={product.image} alt={product.name} className="product-image" />
    <p className="product-price">מחיר כרטיס: {product.price} ₪</p>

    <input
      type="number"
      placeholder="כמות כרטיסים"
      value={quantity}
      onChange={e => setQuantity(Number(e.target.value))}
      className="form-input"
    />
    <input
      type="text"
      placeholder="מספר כרטיס אשראי"
      value={cardNumber}
      onChange={e => setCardNumber(e.target.value)}
      className="form-input"
    />
    <input
      type="text"
      placeholder="תוקף (MM/YY)"
      value={expiry}
      onChange={e => setExpiry(e.target.value)}
      className="form-input"
    />
    <input
      type="text"
      placeholder="CVV"
      value={cvv}
      onChange={e => setCvv(e.target.value)}
      className="form-input"
    />

    <button onClick={handlePurchase} className="purchase-button">רכוש</button>

    {showPopup && (
      <div className="popup-overlay">
        <div className="popup-box">
          <h3>הרכישה בוצעה בהצלחה!</h3>
        </div>
      </div>
    )}
  </div>
);

}
