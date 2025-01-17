import React from "react";
import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

const Profile = () => {
  return (
    <>
      <div className="box-container">
        <NavTop />
        <div
          className="box-inner-content"
          style={{ backgroundColor: "rgb(209 231 221 / 30%)" }}
        >
          <hgroup>
            <h5>johnangelodarauay@yahoo.com</h5>
            <h6>jaad11021996@gmail.com</h6>
          </hgroup>
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
