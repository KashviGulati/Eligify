import { useState, useEffect } from "react";
import { getProfile, createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [form, setForm] = useState({
    age: "",
    annual_income: "",
    category: "",
    gender: "",
    education_level: "",
    state: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const res = await getProfile();

    if (res.ok) {
      navigate("/dashboard"); // already exists
    }
  };

  const handleSubmit = async () => {
  const formattedData = {
    age: Number(form.age),
    annual_income: Number(form.annual_income),
    category: form.category.toUpperCase(),
    gender: form.gender.toUpperCase(),
    education_level: form.education_level,
    state: form.state,
  };

  const res = await createProfile(formattedData);
  const data = await res.json();

  console.log(data); // 🔥 IMPORTANT

  if (res.ok) {
    navigate("/dashboard");
  } else {
    alert(JSON.stringify(data)); // shows exact error
  }
};

  return (
    <div>
      <h2>Profile Form</h2>

      <input placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Income" onChange={(e) => setForm({ ...form, annual_income: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Gender" onChange={(e) => setForm({ ...form, gender: e.target.value })} />
      <input placeholder="Education" onChange={(e) => setForm({ ...form, education_level: e.target.value })} />
      <input placeholder="State" onChange={(e) => setForm({ ...form, state: e.target.value })} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}