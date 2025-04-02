import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountCreation = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (email && password === confirmPassword) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Please check your details!");
    }
  };

  return (
    <div className="bg-container">
      <div className="bg-login-image"></div>

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>← Back</button>

      <div className="login-content">
        <h1 className="account-title">Account Signup</h1>

        <input type="email" placeholder="Email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" className="login-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="login-button" onClick={handleSignup}>Create an Account</button>
      </div>
    </div>
  );
};

export default AccountCreation;