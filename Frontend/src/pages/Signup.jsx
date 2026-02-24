import { useState } from "react";
import { signup, login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await signup(form);
    const data = await res.json();

    if (res.ok) {
      // 🔥 auto login after signup
      const loginRes = await login(form);
      const loginData = await loginRes.json();

      localStorage.setItem("token", loginData.access);

      navigate("/profile"); // always go to profile
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

        <p className="subtitle">Create your account</p>

        <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Sign up</button>

        <p className="switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}