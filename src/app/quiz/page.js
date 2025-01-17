"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Loader from "../components/Loader";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0); // Tracks the current label
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question
  const [selectedOption, setSelectedOption] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const utmGender = searchParams?.get("utm_gender");

  useEffect(() => {
    const fetchQuestionsAndLabels = async () => {
      try {
        // Fetching questions
        const questionResponse = await fetch("/api/admin/questions");
        const questionData = await questionResponse.json();
        if (questionData.success) {
          setQuestions(questionData.questions);
        } else {
          console.error("Failed to fetch questions");
        }

        // Fetching labels
        const labelResponse = await fetch("/api/admin/labels");
        const labelData = await labelResponse.json();
        if (labelData.success) {
          setLabels(labelData.labels);
        } else {
          console.error("Failed to fetch labels");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchQuestionsAndLabels();
  }, []);

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevStep) => prevStep - 1);
    } else {
      router.back();
    }
  };

  const handleOptionClick = (option, index) => {
    setSelectedOption(index); // Highlight selected option
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = {
        questionId: questions[currentQuestionIndex]._id,
        selectedOption: questions[currentQuestionIndex].options[selectedOption],
      };
      setAnswers(updatedAnswers);

      const currentLabel = labels[currentLabelIndex];
      const currentLabelQuestions = questions.filter(
        (question) => question.label === currentLabel._id
      );

      const isLastQuestionInLabel = currentQuestionIndex === currentLabelQuestions.length - 1;
      if (isLastQuestionInLabel) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
      setSelectedOption(null);
    }
  };

  const handleContinueClick = () => {
    const nextLabelIndex = currentLabelIndex + 1;
    if (nextLabelIndex < labels.length) {
      setCurrentLabelIndex(nextLabelIndex);
      setCurrentQuestionIndex(0);
      setShowResults(false);
    } else {
      setShowEmailSection(true);
    }
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowEmailSection(true);
  };

  if (showLoader) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  const calculateResult = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer.selectedOption.value, 0);

    if (totalScore <= 10) {
      return "Low";
    } else if (totalScore <= 20) {
      return "Intermediate";
    } else {
      return "High";
    }
  };

  if (showResults) {
    const currentLabel = labels[currentLabelIndex];

    const currentLabelQuestions = questions.filter(
      (question) => question.label === currentLabel._id
    );
    const currentLabelAnswers = answers.filter((answer) =>
      currentLabelQuestions.some((q) => q._id === answer.questionId)
    );
    const totalScore = currentLabelAnswers.reduce(
      (sum, answer) => sum + answer.selectedOption.value,
      0
    );

    const result = calculateResult(totalScore);
    const readinessResult = "Perfect";
    const insights = "A study in 2022 found that workers who use AI tools in their work have 10-20% higher hourly rates than those who don’t.";
    const userAttributes = {
      Motivation: "High",
      Potential: "High",
      Focus: "Limited",
      "AI Knowledge": "Low",
    };
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center justify-content-center text-center position-relative mb-5">
          <div className="progress-block">
            <div className="d-flex align-items-center justify-content-between w-100 py-3">
              <button
                className="back-button text-decoration-none"
                onClick={handleBackClick}
              >
                <i className="bi bi-arrow-left fw-bold"></i>
              </button>
              <h6 className="fw-bold">Motivation Leval</h6>
              <button className="btn btn-light" type="button" onClick={toggleSidebar}>
                <i className="bi bi-list"></i>
              </button>
              <aside className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
                <nav className="navbar navbar-expand-lg">
                  <div className="container-fluid flex-row flex-wrap  px-0">
                    <button className="btn btn-light" type="button" onClick={toggleSidebar}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link active" href="/terms">Terms & Conditions</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/privacy">Privacy Policy</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/subscription">Subscription Terms</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/support">Support Center</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </aside>
            </div>
            {labels.map((label, index) => (
              <div
                key={label._id}
                className={`progress ${index <= (currentLabelIndex) ? "bg-primary" : ""}`}
                style={{
                  height: "5px",
                  backgroundColor: "#e0e0e0",
                  width: `${60 / labels.length}%`,
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
              </div>
            ))}


          </div>
          <div className="results-container">
            <div className="results-header text-center">
              <h2>{currentLabel.label}</h2>
            </div>

            <div className="readiness-card rounded shadow p-3">
              <div className="score-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold">Readiness score</h6>
                <span className="result-badge">{`Result: ${readinessResult}`}</span>
              </div>
              <div className="score-bar-container mt-3">
                <div className="score-bar position-relative" style={{ height: "10px", background: "linear-gradient(to right, red, yellow, green)" }}>
                  <div
                    className="score-indicator"
                    style={{
                      position: "absolute",
                      left: result === "Low" ? "10%" : result === "Intermediate" ? "50%" : "90%",
                      transform: "translateX(-50%)",
                      top: "-12px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "white",
                      border: "2px solid black",
                    }}
                  >
                    {/* Tooltip */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "2px 5px",
                        borderRadius: "4px",
                        backgroundColor: "#333",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    >
                      {result === "Low"
                        ? "Low"
                        : result === "Intermediate"
                          ? "Moderate"
                          : "High"}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span className="readiness-label">Low</span>
                  <span className="readiness-label">Intermediate</span>
                  <span className="readiness-label">High</span>
                </div>
              </div>

              <div className="gap-3">
                <div className="insights mt-4">
                  <p className="fw-bold"><i className="bi bi-lightbulb-fill text-warning"></i> Impressive score to succeed in AI </p>
                  <p>{insights}</p>
                </div>
              </div>
              <div className="user-attributes mt-4">
                {Object.entries(userAttributes).map(([key, value]) => (
                  <div key={key} className="attribute-item d-flex align-items-center mb-2">
                    <i className="bi bi-star-fill text-primary me-2"></i>
                    <strong>{key}:</strong> <span className="ms-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="button-next">
              <button
                type="button"
                onClick={handleContinueClick}
                className="head-btn-alt btn-alt mb-2 text-uppercase">
                Continue <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
              onClick={() => router.push("/results")}
              style={{ width: "100%", padding: ".75rem" }}
            >
              Continue
            </button>
          </section>
        </div>
      </div>
    );
  }

  if (questions.length === 0 || labels.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentLabel = labels[currentLabelIndex];
  const currentLabelQuestions = questions.filter(
    (question) => question.label === currentLabel?._id
  );

  const currentQuestion = currentLabelQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="box-container">
        <p>No questions available for this label.</p>
      </div>
    );
  }

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center position-relative mb-5">
        {/* Back Button and Logo */}
        <div className="progress-block">
          <div className="d-flex align-items-center justify-content-between w-100 py-3">
            <button
              className="back-button text-decoration-none"
              onClick={handleBackClick}
            >
              <i className="bi bi-arrow-left fw-bold"></i>
            </button>
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" style={{ maxWidth: "130px" }} width={130} height={35} />
            </Link>
            <h6 className="fw-bold count">
              <span className="text-primary">{currentQuestionIndex + 1} </span> /{" "}
              {questions.length}
            </h6>
          </div>
          <div className="progress w-100 mb-2" style={{ height: "5px", backgroundColor: "#e0e0e0" }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{
                width: `${((answers.length + 1) / questions.length) * 100}%`,
                transition: "width 0.3s ease-in-out",
              }}
              aria-valuenow={answers.length + 1}
              aria-valuemin="0"
              aria-valuemax={questions.length}
            />
          </div>
        </div>
        <div className="question-image">
          <Image
            className="img-fluid mt-4"
            src={currentQuestion?.image || "/images/chatbot-img.jpg"}
            width={400}
            height={400}
            alt="Question Image"
          />
        </div>
        {/* Question and Options */}
        <section className="text-center mt-4 w-100">
          <h4 className="fw-bold">{currentQuestion?.question}</h4>
        </section>
        <section className="d-flex flex-column w-100 mt-3 mb-4">
          {currentQuestion.options.map((option, index) => {
            const img =
              option.text === "yes" || option.text === "Yes"
                ? "/images/yes.webp"
                : option.text === "no" || option.text === "No"
                  ? "/images/no.webp"
                  : "/images/somewhat.webp";

            return (
              <div
                key={index}
                className={`card card-horizontal ${selectedOption === index ? "highlighted" : ""
                  }`}
                onClick={() => handleOptionClick(option, index)}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="step1"
                  value={option.value}
                  checked={selectedOption === index}
                  readOnly
                />
                <Image src={img} alt={option.text} width={100} height={100} />
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
            );
          })}
        </section>
        <div className="button-next">
          <button
            type="button"
            className="head-btn-alt btn-alt mb-2 text-uppercase"
            onClick={handleNextClick}
          >
            Next Step <i className="bi bi-arrow-right"></i>
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
