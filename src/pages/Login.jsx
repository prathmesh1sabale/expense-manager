import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const res = await axios.get(
        `https://codingshika.com/APP/EXP/user_login.php?mobile=${mobile}`
      );

      const data = res.data.posts;
      if (data.status === "200") {
        localStorage.setItem("id", data.id);
        navigate("/");
      } else {
        alert("Login failed. Invalid mobile number.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card bg-white p-4 shadow rounded-4">
        <h2 className="text-center text-primary mb-4 fw-bold">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label fw-semibold">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              className="form-control"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
          >
            Login
          </button>

          <div className="text-center mt-3">
            <span className="small">Don't have an account? </span>
            <a href="/register" className="fw-semibold text-primary">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
