// src/components/AboutUs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f8f9fa", color: "#212529", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold d-flex align-items-center">
          <img
            src="/images/logo.jpg"
            alt="Smart Study Logo"
            className="img-fluid"
            style={{ maxWidth: "30px", marginRight: "8px" }}
          />
          Smart Study
        </span>
        <div className="ms-auto d-flex gap-3">
          <button
            className="btn btn-outline-light d-flex align-items-center"
            onClick={() => navigate("/home")}
          >
            <i className="bi bi-house me-1"></i> Home
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => navigate("/myaccount")}
          >
            My Account
          </button>
          <button className="btn active-page" style={{
            backgroundColor: "#ffffff",
            color: "#0d6efd",
            fontWeight: "bold",
            pointerEvents: "none"
          }}>
            About Us
          </button>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container mt-5 text-center">
        <h1 className="fw-bold mb-4">About Us</h1>
        <p className="fs-5 px-4">
          Smart Study is your personalized educational assistant, designed to help students learn better with fun and technology.
          We combine artificial intelligence, interactive content, and gamification to make your learning experience engaging and effective.
        </p>
        <p className="fs-5 px-4 mt-3">
          Whether you're studying for exams or exploring new topics, our platform offers smart notebooks, audio resources, sign language support, and much more.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;

