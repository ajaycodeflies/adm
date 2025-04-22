"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkmode-active");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.body.classList.add("darkmode-active");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("darkmode-active", newMode);
    localStorage.setItem("darkmode-active", newMode.toString());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/frontend/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/user/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  return (
    <main className="d-flex flex-column pt-3" style={{ height: "100vh" }}>
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
          <form
            onSubmit={handleLogin}
            className="w-100 h-100 d-flex flex-column justify-content-center align-items-stretch"
          >
            <h2 className="text-start fw-bold mb-4 onboarding-page-title">
              User Login
            </h2>

            {error && (
              <div
                className="mb-3"
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #f5c6cb",
                  fontSize: "0.95rem",
                }}
              >
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {error}
              </div>
            )}

            <div className="mb-4 custom-form-control">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 custom-form-control position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
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
