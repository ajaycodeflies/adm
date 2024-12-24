"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import "../globals.css";
import Image from "next/image";

export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/admin/questions");
        const data = await response.json();
        if (data.success) {
          setQuestions(data.questions);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      router.back(); // Navigate back to the previous page
    }
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      router.push("/quiz/results");
    }
  };

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const question = questions[currentStep];

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />

        {/* Back Icon and Quiz Count */}
        <div className="d-flex align-items-center justify-content-between w-100 mt-2">
          <button
            className="back-button text-decoration-none"
            onClick={handleBackClick}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <h6>
            <span className="text-primary">{currentStep + 1} </span> / {questions.length}
          </h6>
        </div>

        {/* Progress Bar */}
        <div className="progress w-100 mt-2" style={{ height: "3px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`, // Corrected syntax
            }}
            aria-valuenow={currentStep + 1}
            aria-valuemin="0"
            aria-valuemax={questions.length}
          />
        </div>

        {/* Question Section */}
        <section className="text-center mt-4 w-100 px-4">
          <h4 className="fw-bold">{question.question}</h4>
        </section>

        {/* Options Section */}
        <section className="d-flex flex-column w-100 mt-3 mb-5 px-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="card card-horizontal"
              onClick={() => handleOptionClick(option)}
            >
              <Image
                src={option.image || "/images/step1/male/1.webp"}
                alt={option.text}
                width={100}
                height={100}
              />
              <p className="mb-0 fw-bold text-left">
                {option.text.charAt(0).toUpperCase() + option.text.slice(1)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}