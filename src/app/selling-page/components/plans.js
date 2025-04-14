import React, { useState } from "react";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState("plan-2"); // Default to the most popular plan
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handlePlanChange = (planId) => {
    setSelectedPlan(planId);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="plan-container">
      <div className="badge-blocks">
        <div className="badge-text">
          <p>
            <i className="bi bi-shield-check me-1"></i> Your goal
          </p>
          <h5 className="fw-bold">Professional growth</h5>
        </div>
        <div className="badge-text">
          <p>
            <i className="bi bi-bar-chart-fill me-1"></i> Your target
          </p>
          <h5 className="fw-bold">Buy a house</h5>
        </div>
      </div>
      <div className="plan-blocks">
        <div className="plan mb-3">
          <input
            type="radio"
            name="plan"
            id="plan-1"
            className="form-check-input"
            checked={selectedPlan === "plan-1"}
            onChange={() => handlePlanChange("plan-1")}
          />
          <label
            htmlFor="plan-1"
            className="form-label d-flex align-items-center w-100 mb-0"
          >
            <div className="custom-check"></div>
            <div className="full-price">
              <span>1-WEEK PLAN</span>
              <small>$13.86</small>
            </div>
            <span className="price">
              <svg
                width="18"
                height="48"
                viewBox="0 0 18 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#F1F1F1"
                  d="M17.5398 0.224716C17.6504 0.0829078 17.8202 0 18 0V48C17.8202 48 17.6504 47.9171 17.5398 47.7753L1.87711 27.6896C0.185765 25.5206 0.185763 22.4794 1.87711 20.3104L17.5398 0.224716Z"
                ></path>
              </svg>
              <div className="per-day-price">
                <div className="dollar-sign-price">$</div>
                <div className="big-size-price">1</div>
                <div className="small-size-price">
                  <small>98</small>
                  <small>per day</small>
                </div>
              </div>
            </span>
          </label>
        </div>
        <div className="plan mb-3">
          <div className="highlight">
            <span className="badge badge-soft-primary">
              <i className="bi bi-hand-thumbs-up-fill"></i> Most Popular
            </span>
          </div>
          <input
            type="radio"
            name="plan"
            id="plan-2"
            className="form-check-input"
            checked={selectedPlan === "plan-2"}
            onChange={() => handlePlanChange("plan-2")}
          />
          <label
            htmlFor="plan-2"
            className="form-label d-flex align-items-center w-100 mb-0"
          >
            <div className="custom-check"></div>
            <div className="full-price">
              <span>4-WEEK PLAN</span>
              <small>$39.99</small>
            </div>
            <span className="price">
              <svg
                width="18"
                height="48"
                viewBox="0 0 18 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#F1F1F1"
                  d="M17.5398 0.224716C17.6504 0.0829078 17.8202 0 18 0V48C17.8202 48 17.6504 47.9171 17.5398 47.7753L1.87711 27.6896C0.185765 25.5206 0.185763 22.4794 1.87711 20.3104L17.5398 0.224716Z"
                ></path>
              </svg>
              <div className="per-day-price">
                <div className="dollar-sign-price">$</div>
                <div className="big-size-price">1</div>
                <div className="small-size-price">
                  <small>43</small>
                  <small>per day</small>
                </div>
              </div>
            </span>
          </label>
        </div>
        <div className="plan mb-3">
          <input
            type="radio"
            name="plan"
            id="plan-3"
            className="form-check-input"
            checked={selectedPlan === "plan-3"}
            onChange={() => handlePlanChange("plan-3")}
          />
          <label
            htmlFor="plan-3"
            className="form-label d-flex align-items-center w-100 mb-0"
          >
            <div className="custom-check"></div>
            <div className="full-price">
              <span>12-WEEK PLAN</span>
              <small>$79.99</small>
            </div>
            <span className="price">
              <svg
                width="18"
                height="48"
                viewBox="0 0 18 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#F1F1F1"
                  d="M17.5398 0.224716C17.6504 0.0829078 17.8202 0 18 0V48C17.8202 48 17.6504 47.9171 17.5398 47.7753L1.87711 27.6896C0.185765 25.5206 0.185763 22.4794 1.87711 20.3104L17.5398 0.224716Z"
                ></path>
              </svg>
              <div className="per-day-price">
                <div className="dollar-sign-price">$</div>
                <div className="big-size-price">0</div>
                <div className="small-size-price">
                  <small>95</small>
                  <small>per day</small>
                </div>
              </div>
            </span>
          </label>
        </div>
        <div className="d-flex mt-4">
          <i className="bi bi-info-circle me-2 text-primary"></i>
          <div className="icon-text">
            <span>
              People using plan for 3 months achieve twice as many results as
              for 1 month
            </span>
            <p className="fs-small text-muted mt-2 mb-4">
              *According to a research by ADM Digital, 2024
            </p>
          </div>
        </div>
        <button type="button" className="btn pulse-btn w-100" onClick={toggleModal}>
          GET MY PLAN
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-contentt">
            <h3>Confirm Your Plan</h3>
            <p>You selected: {selectedPlan}</p>
            <button className="btn btn-primary" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
