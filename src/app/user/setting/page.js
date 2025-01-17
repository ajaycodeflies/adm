import React from "react";

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

const Setting = () => {
  return (
    <>
      <div className="box-container">
        <NavTop />
        <div className="box-inner-content">
          <div className="navigation-group -badge">
            <a href="#">
              <span>
                <i className="bi bi-flag"></i>
                Terms and Conditions
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-lock"></i>
                Privacy Policy
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-file-earmark-text"></i>
                Subscription Terms
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-mailbox-flag"></i>
                Subscription
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-clock-history"></i>
                Payment History
              </span>
              <span>
                <i className="bi bi-patch-check-fill"></i>
                0%
              </span>
            </a>
            <a href="#">
              <span>
                <i className="bi bi-globe2"></i>
                Language
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

export default Setting;
