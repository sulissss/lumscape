import React, { useState } from "react";
import "../../style/main/Login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

const Login = ({ setIsLoggedIn, setUserScope }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post("https://lums-3d-planner-sigma.vercel.app" + '/auth/login', {
          email,
          password,
        });

        if (response.data.success) {
          if (response.data.message) {
            setUserScope(response.data.message);
          }
          setSuccessMessage("Login successful!");
          setTimeout(() => {
            setSuccessMessage(null);
            setIsLoggedIn(true);
            navigate("/");
          }, 500);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Invalid credentials. Try Again.");
        } else {
          setErrorMessage(`Network error: ${error.message}`);
        }
      }
    } else {
      setErrorMessage("Please enter valid credentials!");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="bg-container">
      <div className="bg-login-image"></div>

      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      {errorMessage && <div className="error-popup">{errorMessage}</div>}

      {successMessage && <div className="success-popup">{successMessage}</div>}

      <div className="login-content">
        <h1 className="account-title">Account Login</h1>

        <form onSubmit={handleLogin}>
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

          <button className="login-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;