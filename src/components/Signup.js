import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const API_ENDPOINT = process.env.BACKEND_API;

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (email && password === confirmPassword) {
      try {
        const response = await fetch('http://localhost:10000/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, scope: "user" }), // Send plain password to backend
        });

        if (response.ok) {
          setSuccessMessage("Signup successful!");
          setTimeout(() => {
            setSuccessMessage(null);
            setIsLoggedIn(true);
            navigate("/");
          }, 1000);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Unknown error');
          setTimeout(() => setErrorMessage(null), 3000);
        }
      } catch (error) {
        setErrorMessage('Network error. Please try again.');
        setTimeout(() => setErrorMessage(null), 3000);
        console.error('Signup error:', error);
      }
    } else {
      setErrorMessage("Please check your details!");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="bg-container">
      <div className="bg-login-image"></div>

      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-popup">
          {successMessage}
        </div>
      )}

      <div className="login-content">
        <h1 className="account-title">Account Signup</h1>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;