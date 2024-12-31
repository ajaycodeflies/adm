"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Loader from "../components/Loader";
import "../globals.css";
import Image from "next/image";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showEmailSection, setShowEmailSection] = useState(false);

  const utmGender = searchParams?.get("utm_gender"); // Safely handle `searchParams`

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
      router.back();
    }
  };

  const handleOptionClick = (option, index) => {
    setSelectedOption(index);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        const params = new URLSearchParams(window.location.search);
        params.set("step", nextStep + 1);
        router.push(`/quiz?${params.toString()}`);
      } else {
        setShowLoader(true);
      }

      setSelectedOption(null);
    }, 500);
  };

  const handleQuizClick = (quizGroup) => {
    router.push(`/quiz?utm_gender=${utmGender}&step=`);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowEmailSection(true);
  };

  if (showLoader) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  if (showEmailSection) {
    return (
      <div className="box-container">
        <div className="d-flex flex-column">
          <Header />
          <section className="my-5">
            <div className="text-center justify-content-center align-items-center mb-5">
              <h3 className="fw-bold">
                Enter your email to get your{" "}
                <span className="fw-bold" style={{ color: "var(--blue-dark)" }}>
                  Personal AI-Driven Income Growth
                </span>{" "}
                Challenge!
              </h3>
            </div>
            <input
              className="form-control mb-3 background-primary pr-[44px] pl-[44px] text-sm bg-[14px]"
              type="text"
              inputMode="email"
              placeholder="Your email"
              autoCapitalize="none"
              autoCorrect="off"
              style={{
                backgroundImage: "url('/icons/mail.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                height: "52px",
              }}
            />
            <small>
              We respect your privacy and are committed to protecting your
              personal data. Your data will be processed in accordance with our{" "}
              <a
                className="font-semibold underline"
                href="/privacy"
                target="_blank"
              >
                Privacy Policy.
              </a>
            </small>
            <button
              className="btn btn-blue main-btn-con"
              onClick={() => handleQuizClick("continue")}
              style={{ width: "100%", padding: ".75rem" }}
            >
              Continue
            </button>
          </section>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const question = questions[currentStep];

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center position-relative">
        <Header />
        <div className="progress-block">
          {/* Back Icon and Quiz Count */}
          <div className="d-flex align-items-center justify-content-between w-100 mt-2">
            <button
              className="back-button text-decoration-none"
              onClick={handleBackClick}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h6>
              <span className="text-primary">{currentStep + 1} </span> /{" "}
              {questions.length}
            </h6>
          </div>
          {/* Progress Bar */}
          <div className="progress w-100 mt-2" style={{ height: "3px" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{
                width: `${((currentStep + 1) / questions.length) * 100}%`,
              }}
              aria-valuenow={currentStep + 1}
              aria-valuemin="0"
              aria-valuemax={questions.length}
            />
          </div>
        </div>
        <div className="question-image">
          <Image
            className="img-fluid mt-4"
            src="/images/chatbot-img.jpg"
            width={400}
            height={400}
            alt="Question Image"
          />
        </div>
        {/* Question Section */}
        <section className="text-center mt-4 w-100 px-4">
          <h4 className="fw-bold">{question.question}</h4>
        </section>
        {/* Options Section */}
        <section className="d-flex flex-column w-100 mt-3 mb-4 px-3">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`card card-horizontal ${
                selectedOption === index ? "highlighted" : ""
              }`}
              onClick={() => handleOptionClick(option, index)}
            >
              <input
                type="radio"
                id="replaceDynamicId"
                name="replaceDynamicName"
                value="replaceDynamicValue"
              />
              <Image
                src={option.image || "/images/step1/male/1.webp"}
                alt={option.text}
                width={100}
                height={100}
              />
              <p className="mb-0 fw-bold text-left">
                {option.text.charAt(0).toUpperCase() + option.text.slice(1)}
              </p>
              {selectedOption === index && (
                <i
                  className="bi bi-check-circle text-blue ms-auto"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              )}
            </div>
          ))}
        </section>
        {/* next-btn */}
        <div className="button-next">
          <button type="button" className="head-btn-alt btn-alt mb-2">
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Quiz() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QuizContent />
    </Suspense>
  );
}
