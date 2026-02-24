import { useState, useEffect } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // 🔥 if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/profile");
  }, []);

  const handleSubmit = async () => {
    const res = await login(form);
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access);
      navigate("/profile"); // go to profile logic
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="logo">
          Elig<span>ify</span>
        </h1>

        <p className="subtitle">Welcome back</p>

        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Login</button>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>Signup</span>
        </p>
      </div>
    </div>
  );
}