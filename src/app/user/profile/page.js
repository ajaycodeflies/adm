"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/frontend/user/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/user/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/frontend/user/profile");
      const data = await response.json();
      if (data.success) {
        setUser(data.data);
      } else {
        console.error(data.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="box-container">
        <NavTop />
        <div
          className="box-inner-content"
          style={{ backgroundColor: "rgb(209 231 221 / 30%)" }}
        >
          <hgroup>
            <h5>{user ? `${user.first_name} ${user.last_name}` : "Guest"}</h5>
            <h6>{user?.email || "Not logged in"}</h6>
          </hgroup>

          <div className="navigation-group">
            <a href="#" onClick={handleLogout}>
              <span>
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </span>
            </a>
          </div>
          {/* Help and certificates */}
          <div className="navigation-group">
            <a href="#">
              <span>
                <i className="bi bi-chat-left-dots"></i>
                Help
              </span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
          <h5 className="my-3 heading-with-btn">Certificates</h5>
          <div className="navigation-group -badge">
            <a href="#">
              <span>
                <i className="bi bi-lock-fill"></i>
                ChatGPT
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-lock-fill"></i>
                DALL-E
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-lock-fill"></i>
                MidJourney
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-lock-fill"></i>
                Jasper AI
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
          </div>
        </div>
        <NavBottom />
      </div>
    </>
  );
};

export default Profile;
