import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await signup(form);
    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}