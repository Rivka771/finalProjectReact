import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./components/ProfilePage";
import './App.css';


function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <header className="main-header">
  <div className="header-container">
    <h1 className="site-title" onClick={() => window.location.href = "/"}>
       אתר ההגרלות
    </h1>
    <nav className="nav-links">
      <Link to="/">בית</Link>
      {user ? (
        <>
          <Link to="/profile">האזור האישי</Link>
          <button onClick={handleLogout} className="logout-button">
            התנתק
          </button>
        </>
      ) : (
        <>
          <Link to="/login">התחברות</Link>
          <Link to="/register">הרשמה</Link>
        </>
      )}
    </nav>
  </div>
</header>


      <main className="p-4 min-h-[80vh]">
        <Routes>
<Route path="/" element={<HomePage user={user} />} />
        <Route path="/product/:id" element={<ProductPage user={user} setUser={setUser} />} />

          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm setUser={setUser} />} />
<Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </main>
    </Router>
  );
}


export default App;
