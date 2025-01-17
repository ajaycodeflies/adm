"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load user's preference from localStorage
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkmode-active");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.body.classList.add("darkmode-active");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("darkmode-active", newMode);
    localStorage.setItem("darkmode-active", newMode.toString());
  };

  return (
    <main
      className="d-flex flex-column pt-3"
      style={{ height: "100vh" }}
    >
      <div className="max-500 w-100 mx-auto">
        <div className="mb-5">
          <Image
            src="/images/logo.png"
            width={180}
            height={100}
            alt="Logo"
            className="logo-img img-fluid w-20 mx-auto d-block opacity-90"
          />
        </div>
        <div className="px-4">
          <form className="w-100 h-100 d-flex flex-column justify-content-center align-items-stretch">
            <h2 className="text-start fw-bold mb-4 onboarding-page-title">
              User Login
            </h2>
            <div className="mb-4 custom-form-control">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4 custom-form-control">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "rgb(108, 117, 125)",
                  fontSize: "22px",
                  backgroundColor:
                    "rgba(var(--bs-light-rgb),var(--bs-bg-opacity))",
                }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </div>
            <div className="forgot-pass mb-4">
              <Link href="/">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="btn btn-blue w-100 custom-form-btn"
            >
              Login
            </button>
          </form>
          <div className="bottom-auth-link">
            Don&#39;t have an account?{" "}
            <Link href="/user/signup">Start The Quiz</Link>
          </div>
        </div>
      </div>
      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="darkmode-toggle-btn">
        {isDarkMode ? (
          <i className="bi bi-sun-fill" style={{ fontSize: "1.2rem" }}></i>
        ) : (
          <i className="bi bi-moon-fill" style={{ fontSize: "1.2rem" }}></i>
        )}
      </button>
    </main>
  );
}
