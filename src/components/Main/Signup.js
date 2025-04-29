import React, { useState } from "react";
import "../../style/main/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setIsLoggedIn, setUserScope }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [scope, setScope] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const scope = "user";

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      await axios.post('https://lums-3d-planner.vercel.app/users/signup', {
        email: email,
        password: password,
        scope: scope,
      });

      // localStorage.setItem("userScope", scope);
      setUserScope(scope);
      setSuccessMessage("Signup successful!");
      setTimeout(() => {
        setSuccessMessage(null);
        setIsLoggedIn(true);
        navigate("/");
      }, 1000);

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Signup failed. Please try again.');
        console.error('Signup error (server response):', error.response);
      } else if (error.request) {
        setErrorMessage('Network error. Please try again.');
        console.error('Signup error (no response):', error.request);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
        console.error('Signup error (other):', error.message);
      }
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

          {/* <select
            className="scope-select"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          >
            <option value="">Select Account Type</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          <button className="login-button" type="submit">
            Create an Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;