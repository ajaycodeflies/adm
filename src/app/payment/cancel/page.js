"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

const Cancel = () => {
  return (
    <div className="box-container min-vh-100 d-flex flex-column">
      <Header />

      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3">
        <div className="cancel-icon mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            className="bi bi-x-circle-fill text-danger"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>

        <h1 className="fw-bold mb-3">Payment Cancelled</h1>
        <p className="fs-5 text-muted mb-4">
          It looks like your payment was cancelled. No worries—you can try again anytime.
        </p>

        <Link href="/" className="btn btn-outline-primary px-4">
          Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Cancel;
