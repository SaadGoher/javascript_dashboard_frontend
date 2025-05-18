import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom"; 

const AuthCheck=() => {
  const navigate = useNavigate();
  useEffect(() => {
    const Session = localStorage.getItem("UserSession");
    if (Session) {
      navigate("/dashboard"); // Redirect to login if no session found
    }
  }, [navigate]);
  return null;
};
export default AuthCheck;