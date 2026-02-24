import { useState, useEffect } from "react";
import { getProfile, createProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./profile.css";
export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    annual_income: "",
    category: "",
    gender: "",
    education_level: "",
    state: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    const res = await getProfile();

    console.log("Profile status:", res.status); // debug

    if (res.status === 200) {
      navigate("/dashboard"); // profile exists
    } else if (res.status === 404) {
      setLoading(false); // show form
    } else {
      alert("Unauthorized. Please login again.");
      navigate("/login");
    }
  };

  const handleSubmit = async () => {
    const formattedData = {
      age: Number(form.age),
      annual_income: Number(form.annual_income),
      category: form.category,
      gender: form.gender,
      education_level: form.education_level,
      state: form.state,
    };

    const res = await createProfile(formattedData);
    const data = await res.json();

    if (res.ok) {
      navigate("/dashboard");
    } else {
      alert(JSON.stringify(data));
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Complete Your Profile</h2>

        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <input
          type="number"
          placeholder="Annual Income"
          onChange={(e) =>
            setForm({ ...form, annual_income: e.target.value })
          }
        />

        <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Category</option>
          <option value="GEN">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="EWS">EWS</option>
        </select>

        <select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <input
          placeholder="Education"
          onChange={(e) =>
            setForm({ ...form, education_level: e.target.value })
          }
        />

        <input
          placeholder="State"
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <button onClick={handleSubmit}>Save & Continue</button>
      </div>
    </div>
  );
}