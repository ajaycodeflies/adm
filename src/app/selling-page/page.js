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
  const [timeLeft, setTimeLeft] = useState(10 * 60);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-selling">
        <div className="top-nav py-3">
          <Link href="/">
            <Image
              className="logo"
              src="/images/logo.png"
              width={128}
              height={30}
              alt="User 1"
            />
          </Link>
          {/* <div className="counter">
            <p className="counter-label">Discount expires in</p>
            <div className="counter-time">
              <div className="time-box">
                <span className="time-value">
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}
                </span>
                <span className="time-label">min</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-box">
                <span className="time-value">
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
                <span className="time-label">sec</span>
              </div>
            </div>
          </div> */}
          <Link href="#plans" className="pulse-btn">
            Get My Plan
          </Link>
        </div>
        <div className="page-content">
          <SellingFirst />
          <p>This is not a guarantee or promise of results.</p>
          <Program />
          {/* <PlansPoints />
          <Plans />
          <PaymentNotified />
          <CourseSlider />
          <PointerBlock />
          <Testmonial /> */}
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
