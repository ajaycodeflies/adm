"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SellingFirst from "./components/selling-first";
import Program from "./components/program";
import Plans from "./components/plans";
import CourseSlider from "./components/course-slider";
import Testmonial from "./components/testmonial";
import PointerBlock from "./components/pointer-block";
import PaymentNotified from "./components/payment-notified";
import PlansPoints from "./components/plans-points";

function Selling() {
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
    <>
      <section className="bg-selling">
        <div className="top-nav py-3">
          <Link href="/" className="head-link">
            <Image
              className="logo"
              src="/images/logo.png"
              width={128}
              height={30}
              alt="User 1"
            />
          </Link>
          <div class="counter">
            <p class="counter-label">Discount expires in</p>
            <div class="counter-time">
              <div class="time-box">
                <span class="time-value">07</span>
                <span class="time-label">min</span>
              </div>
              <span class="time-separator">:</span>
              <div class="time-box">
                <span class="time-value">27</span>
                <span class="time-label">sec</span>
              </div>
            </div>
          </div>
          <Link href="#plans" className="pulse-btn">
            Get My Plan
          </Link>
        </div>
        <div className="page-content">
          <SellingFirst />
          <p>This is not a guarantee or promise of results.</p>
          <Program />
          <PlansPoints />
          <Plans />
          <PaymentNotified />
          <CourseSlider />
          <PointerBlock />
          <Testmonial />
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="darkmode-toggle-btn"
        >
          {isDarkMode ? (
            <i className="bi bi-sun-fill" style={{ fontSize: "1.2rem" }}></i>
          ) : (
            <i className="bi bi-moon-fill" style={{ fontSize: "1.2rem" }}></i>
          )}
        </button>
      </section>
    </>
  );
}

export default Selling;
