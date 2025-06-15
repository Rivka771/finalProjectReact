import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/users?email=" + encodeURIComponent(email))
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          setError("משתמש כבר קיים עם האימייל הזה");
        } else {
          const newUser = { email, password, purchases: [] };
          fetch("http://localhost:3001/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
            .then(res => res.json())
            .then(user => {
              setUser(user);
              navigate("/");
            })
            .catch(() => setError("שגיאה ביצירת משתמש"));
        }
      });
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">הרשמה</h2>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">הרשם</button>
    </form>
  );
}
