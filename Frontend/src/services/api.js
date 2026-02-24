const BASE_URL = "http://127.0.0.1:8000/api";

// 🔹 helper to get token
const getToken = () => localStorage.getItem("token");

// 🔹 SIGNUP
export const signup = async (data) => {
  return fetch(`${BASE_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 🔹 LOGIN (JWT)
export const login = async (data) => {
  return fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 🔹 GET PROFILE
export const getProfile = async () => {
  return fetch(`${BASE_URL}/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`, // 🔥 JWT HERE
    },
  });
};

// 🔹 CREATE PROFILE
export const createProfile = async (data) => {
  return fetch(`${BASE_URL}/profile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // 🔥 JWT HERE
    },
    body: JSON.stringify(data),
  });
};