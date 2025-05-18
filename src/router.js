import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./login";
import Dashboard from "./dasboard";
function Path() {
    const [session, setSession] = useState(null);
    console.log("session>>>>",session)

    useEffect(() => {
        const storedSession = localStorage.getItem("UserSession");
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          session ? <Navigate to="/dashboard" /> : <Login />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default Path;