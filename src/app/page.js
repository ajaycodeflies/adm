"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [joinedCount, setJoinedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/frontend/home");
        const data = await res.json();

        if (data.success) {
          setAvatars(data.avatars);
          setJoinedCount(data.total);
        }
      } catch (error) {
        console.error("Failed to load landing users", error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkmode-active");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.body.classList.add("darkmode-active");
    }
  }, []);
  // Toggle dark mode for for design
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("darkmode-active", newMode);
    localStorage.setItem("darkmode-active", newMode.toString());
  };
  return (
    <>
      <div className="landing-screen">
        <section className="bg-container">
          <div className="top-bar">
            <div className="group-left">
              <Image
                className="logo"
                src="/images/logo.png"
                width={128}
                height={30}
                alt="User 1"
              />
              <Link href="/" className="head-link">
                Home
              </Link>
            </div>
            <div className="group-right">
              <a href="/user/login" className="head-btn">
                Login
              </a>
              <a href="/start-quiz" className="head-btn-alt">
                Start Now
              </a>
            </div>
          </div>
          <div className="banner-row">
            {/* Left Content */}
            <div className="block-50">
              <div className="pill">
                <span>AI</span> ADM Digital{" "}
                <i className="bi bi-arrow-right"></i>
              </div>
              <h1>Become the Master of AI</h1>
              <p className="banner-text">
                Learn how AI can increase your income and improve your life.
              </p>
              <a href="/start-quiz" className="main-btn">
                Start Now <i className="bi bi-chevron-right"></i>
              </a>
              <div className="users-joined">
                <div className="img-avatar-row">
                  {avatars.map((avatar, index) => (
                    <Image
                      key={index}
                      className="img-avatar"
                      src={avatar}
                      width={40}
                      height={40}
                      alt={`User ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="users-joined">
                  More than {joinedCount.toLocaleString()}+ people joined
                </p>
              </div>
            </div>
            {/* Right Content */}
            <div className="block-50">
              <div className="img-box">
                <Image
                  className="img-banner"
                  src="/images/chatbot-img.jpg"
                  width={500}
                  height={500}
                  alt="Chatbot"
                />
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
        </section>
      </div>
    </>
  );
}
