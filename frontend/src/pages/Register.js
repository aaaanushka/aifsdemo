import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post("https://aifs-backend.onrender.com/api/register", {
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Register Failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={register}>Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;