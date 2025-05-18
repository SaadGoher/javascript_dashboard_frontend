import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Button from "./Component/button";
import InputField from "./Component/input"; // adjust path as needed
import api from "./axios/api"; // Make sure you have an axios instance exported from this file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    let hasError = false;

    setEmailError("");
    setPasswordError("");

    // if (!regexEmail.test(email)) {
    //   hasError = true;
    //   setEmailError("Please enter a valid email.");
    // }

    // if (!regexPassword.test(password)) {
    //   hasError = true;
    //   setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, and special characters.");
    // }

    if (hasError) return;

    const payload = { email, password };

    try {
      const response = await api.post("/auth/login", payload);
      alert("Login successful!");
      console.log("Login response:", response.data);
      if(response.data) {
        console.log("Login response data:", response.data);
        localStorage.setItem("UserSession", JSON.stringify(response.data)); // Store token in local storage
       navigate("/dashboard");
      }
      else {
        alert("Login failed: " + response.data.message);
      }

    } catch (error) {
      if (error.response) {
        alert("Login failed: " + error.response.data.message);
        console.error("Login error:", error.response.data);
      } else {
        console.error("Network error:", error);
        alert("Network error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please login to your account</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            Email
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          <div className="input-group">
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>

          <Button type="submit" className="login-btn">
            Login
          </Button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
