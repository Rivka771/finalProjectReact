import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/users?email=" + encodeURIComponent(email))
      .then(res => res.json())
      .then(users => {
        if (users.length === 0) {
          // משתמש לא נמצא - הפנה להרשמה
          navigate("/register");
        } else {
          const user = users[0];
          if (user.password === password) {
            setUser(user);
            navigate("/"); // או לכל דף אחר אחרי התחברות
          } else {
            setError("סיסמה שגויה");
          }
        }
      })
      .catch(() => setError("שגיאה בשרת"));
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="text-2xl mb-4">התחברות</h2>
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">התחבר</button>
    </form>
  );
}
