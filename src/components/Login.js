import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Please enter valid credentials!");
    }
  };

  return (
    <div className="bg-container">
      <div className="bg-login-image"></div>

      <button className="back-button" onClick={() => navigate("/")}>← Back</button>

      <div className="login-content">
        <h1 className="account-title">Account Login</h1>

        <input type="email" placeholder="Email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="login-button" onClick={handleLogin}>Submit</button>
      </div>
    </div>
  );
};

export default Login;