import { useEffect, useState } from "react";

export default function ProfilePage({ user }) {
  // הסרנו את products
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => {
        // כאן נשאר רק הנתון data בלי לשמור ב-state נפרד
        const purchasesWithDetails = user.purchases?.map(purchase => {
          const product = data.find(p => Number(p.id) === Number(purchase.productId));
          return product ? {
            ...product,
            quantity: purchase.quantity,
            totalPrice: product.price * purchase.quantity
          } : null;
        }).filter(Boolean);

        setUserPurchases(purchasesWithDetails);
      });
  }, [user]);

  if (!user) {
    return <div className="text-center mt-6 text-red-600">יש להתחבר כדי לצפות בפרופיל.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">שלום, {user.username || user.email}!</h2>
      <h3 className="text-xl mb-3">הרכישות שלך:</h3>

      {userPurchases.length === 0 ? (
        <p>עדיין לא רכשת מוצרים.</p>
      ) : (
        <ul className="space-y-4">
          {userPurchases.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow bg-white">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p>מחיר ליחידה: {item.price} ₪</p>
              <p>כמות שנרכשה: {item.quantity}</p>
              <p className="font-bold text-blue-600">סה"כ: {item.totalPrice} ₪</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
