
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("https://aifs-backend.onrender.com/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;