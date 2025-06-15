import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProfilePage from "./components/ProfilePage";



function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => window.location.href = "/"}>
          אתר הגרלות
        </h1>
        <nav className="space-x-4">
          <Link to="/">בית</Link>
          {user ? (
            <>
              <Link to="/profile">האזור האישי</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
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
      </header>

      <main className="p-4 min-h-[80vh]">
        <Routes>
<Route path="/" element={<HomePage user={user} />} />
<Route path="/product" element={<ProductPage user={user} setUser={setUser} />} />

          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm setUser={setUser} />} />
<Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </main>
    </Router>
  );
}


export default App;
