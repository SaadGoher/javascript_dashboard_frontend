import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import Button from "./Component/button";
import axios from 'axios';
import api from "./axios/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

// axios interceptor for logging requests and responses to modify the request and response



  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const payload = {
      name,
      email,
      password,
    };
    try {
      const response = await api.post("/auth/signup", payload);
      alert("Account created successfully!");
      console.log("Server response:", response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        alert("Signup failed: " + error.response.data.message);
        console.error("Signup error:", error.response.data);
      } else {
        // Network error or request not sent
        console.error("Network error:", error);
        alert("Network error occurred.");
      }
    }
  };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   const payload = {
  //     name,
  //     email,
  //     password,
  //   };
  //   try {
  //     const response = await fetch("http://localhost:5000/api/auth/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
  //       alert("Account created successfully!");
  //       console.log("Server response:", result);
  //     } else {
  //       alert("Signup failed: " + result.message);
  //       console.error("Signup error:", result);
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //     alert("Network error occurred.");
  //   }
  // };

  return (
    <div className="container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <p className="subtitle">Sign up to get started</p>
        <form onSubmit={handleSignup}>
        <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="login-btn" onclick={() => { }}>
            Signup </Button>

        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
//Inside your React project(e.g.using Vite or Create React App), use the following Signup.jsx:


export default Signup;
