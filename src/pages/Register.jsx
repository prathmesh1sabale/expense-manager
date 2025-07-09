import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"; // Optional for fade-in or shared styles

const Register = () => {
  const [uname, setUname] = useState("");
  const [mobile, setMobile] = useState("");
  const [opbal, setOpbal] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!uname || !mobile || !opbal) {
      return alert("Please fill all fields.");
    }

    if (!/^\d{10}$/.test(mobile)) {
      return alert("Please enter a valid 10-digit mobile number.");
    }

    if (isNaN(opbal) || parseFloat(opbal) < 0) {
      return alert("Please enter a valid opening balance.");
    }

    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("mobile", mobile);
    formData.append("opbal", opbal);

    try {
      const res = await axios.post(
        "https://codingshika.com/APP/EXP/add_user.php",
        formData
      );

      const status = res.data.posts?.status;
      if (status === "200") {
        alert("Registration successful. Please log in.");
        navigate("/login");
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="register-container d-flex align-items-center justify-content-center">
      <div className="register-card bg-white p-4 shadow rounded-4">
        <h2 className="text-center text-success mb-4 fw-bold">Create Account</h2>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter 10-digit mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Opening Balance</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter opening balance"
            value={opbal}
            onChange={(e) => setOpbal(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success w-100 fw-semibold"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
