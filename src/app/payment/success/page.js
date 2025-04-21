"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Success = () => {
  return (
    <div className="box-container min-vh-100 d-flex flex-column">
      <Header />

      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
        <div className="success-icon mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            className="bi bi-check-circle-fill text-success"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.03a.75.75 0 0 0 1.08 0l3.992-3.992a.75.75 0 1 0-1.06-1.06L7.5 8.439 5.53 6.47a.75.75 0 0 0-1.06 1.06l2.5 2.5z" />
          </svg>
        </div>

        <h1 className="fw-bold mb-3">Payment Successful!</h1>
        <p className="fs-5 text-muted mb-4">
          Thank you for your purchase. Your plan is now active and ready to use.
        </p>

        <a href="/" className="btn btn-primary px-4">
          Go to Dashboard
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Success;
