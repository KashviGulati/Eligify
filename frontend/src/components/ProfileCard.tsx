import { useState } from "react";

const ProfileCard = () => {
  const [formData, setFormData] = useState({
    age: "",
    annual_income: "",
    category: "",
    gender: "",
    education_level: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Profile saved!");
      } else {
        alert("Error saving profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16 flex justify-center px-6">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full max-w-3xl border border-sageLight">
        
        <h2 className="text-2xl font-semibold text-textDark mb-6">
          Complete Your Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          />

          <input
            type="number"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
            placeholder="Annual Income"
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          >
            <option value="">Category</option>
            <option value="GEN">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          >
            <option value="">Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <input
            type="text"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            placeholder="Education Level"
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          />

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="p-3 rounded-xl border border-sageLight focus:outline-none focus:ring-2 focus:ring-sage"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-sage text-white py-3 rounded-full hover:bg-sageLight transition"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;