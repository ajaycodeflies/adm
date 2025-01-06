"use client";

import GenderSelector from "../components/GenderSelector";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmGender = searchParams.get("utm_gender");
  const step = searchParams.get("step");

  const handleAgeClick = (ageGroup) => {
    router.push(`/start-quiz?utm_gender=${utmGender}&age=${ageGroup}&step=1`);
  };

  const handleGenderClick = (gender) => {
    router.push(`/start-quiz?utm_gender=${gender}`);
  };

  const handleQuizClick = (quizGroup) => {
    router.push(`/quiz?utm_gender=${utmGender}&step=1`);
  };

  if (step === "1") {
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <Header />
          <section className="mt-2 text-center">
            <div
              className="pt-4"
              style={{
                backgroundColor: "#eeeeff",
                borderRadius: ".5rem"
              }}
            >
              <h2 className="fw-bold" style={{ fontSize: "2rem", color: "#6d9eeb" }}>
                100 000+ people
              </h2>
              <p style={{ color: "#555", marginTop: "-5px", marginBottom: "20px" }}>
                already use ADM Digital
              </p>
              <div
                style={{
                  borderRadius: "8px",
                  margin: "0 20px",
                  background: "#fff",
                  padding: "20px",
                }}
              >
                <blockquote style={{ fontStyle: "italic", fontSize: "1rem" }}>
                  "AI Won't Replace Humans — But Humans With AI Will Replace Humans
                  Without AI"
                </blockquote>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    marginTop: "10px",
                  }}
                >
                </p>
                <img src="/images/hw_social-proof_harvard_logo.webp" alt="Harvard University" style={{ maxWidth: "100px", marginTop: "10px" }} />
              </div>
              <div className="py-4">
                <p className="m-auto text-center font-semibold text-[#24234C]"> Latest AI tools mentioned in</p>
                <img className="m-auto h-auto" src="/images/hw_social-proof_source_logo.webp" style={{ maxWidth: "320px" }} />
              </div>
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
            </div>
            <div className="button-continue">
              <button
              type="button"
              onClick={() => handleQuizClick("continue")}
              className="head-btn-alt btn-alt mb-2 text-uppercase">
                Continue <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }


  // Step 1: Age Selector
  if (utmGender) {
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <Header />
          <section className="mt-5">
            <h2 className="fw-bold text-uppercase">
              AI-Driven income growth challenge
            </h2>
            <p className="text-uppercase">
              Select Your{" "}
              <span>
                <b>age</b>
              </span>
            </p>
            <p className="fw-bold">1-Minute Quiz</p>
            <div className="row justify-content-center mt-4">
              {utmGender === "male" ? (
                <>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image src="/images/under-18-m.webp" width={100} height={100} alt="Under 18" />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("under-18")}
                        >
                          Under 18 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_male_18-24.webp"
                        width={100}
                        height={100}
                        alt="Male 18-24"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("18-24")}
                        >
                          Age: 18-24 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_male_25-34.webp"
                        width={100}
                        height={100}
                        alt="Male 25-34"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("25-34")}
                        >
                          Age: 25-34 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_male_35-44.webp"
                        width={100}
                        height={100}
                        alt="Male 35-44"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("35-44")}
                        >
                          Age: 35-44 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_male_45.webp"
                        width={100}
                        height={100}
                        alt="Male 45+"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("45+")}
                        >
                          Age: 45+ <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image src="/images/under-18-f.webp" width={100} height={100} alt="Under 18" />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("under-18")}
                        >
                          Under 18 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_female_18-24.webp"
                        width={100}
                        height={100}
                        alt="Female 18-24"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("18-24")}
                        >
                          Age: 18-24 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_female_25-34.webp"
                        width={100}
                        height={100}
                        alt="Female 25-34"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("25-34")}
                        >
                          Age: 25-34 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_female_35-44.webp"
                        width={100}
                        height={100}
                        alt="Female 35-44"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("35-44")}
                        >
                          Age: 35-44 <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card">
                      <Image
                        src="/images/picker_female_45.webp"
                        width={100}
                        height={100}
                        alt="Female 45+"
                      />
                      <div className="card-body">
                        <button
                          className="btn btn-blue"
                          onClick={() => handleAgeClick("45+")}
                        >
                          Age: 45+ <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
          <footer className="text-center text-muted small">
            <p className="text-muted small mb-2">
              By choosing your age, you agree with {" "}
              <a href="/terms" className="text-muted">Terms and Conditions</a>,{" "}
              <a href="/privacy" className="text-muted">Privacy Policy</a>,{" "}
              <a href="/subscription" className="text-muted">Subscription Terms</a>
            </p>
            <p>&copy; 2024 ADM Digital. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    );
  }

  // Default: Gender Selector
  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-5">
          <h2 className="fw-bold text-uppercase">
            AI-Driven income growth challenge
          </h2>
          <p className="text-uppercase">
            Select Your{" "}
            <span>
              <b>Gender</b>
            </span>
          </p>
          <p className="fw-bold">1-Minute Quiz</p>
          <div className="row justify-content-center mt-4">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
              <div className="card">
                <img
                  src="/images/picker_male_18-24.webp"
                  alt="Male"
                  className="card-img"
                />
                <div className="card-body">
                  <button
                    className="btn btn-blue"
                    onClick={() => handleGenderClick("male")}
                  >
                    Male <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-3">
              <div className="card">
                <img
                  src="/images/picker_female_18-24.webp"
                  alt="Female"
                  className="card-img"
                />
                <div className="card-body">
                  <button
                    className="btn btn-blue"
                    onClick={() => handleGenderClick("female")}
                  >
                    Female <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-4">
              <div className="card">
                <img src="/images/other.png" alt="other" className="card-img" />
                <div className="card-body">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    className="d-none"
                  />
                  <button
                    className="btn btn-blue"
                    onClick={() => handleGenderClick("other")}
                  >
                    Not To Say <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="text-center text-muted small">
          <p className="text-muted small mb-2">
            By clicking "Male" or "Female", you agree with {" "}
            <a href="/terms" className="text-muted">Terms and Conditions</a>,{" "}
            <a href="/privacy" className="text-muted">Privacy Policy</a>,{" "}
            <a href="/subscription" className="text-muted">Subscription Terms</a>
          </p>
          <p>&copy; 2024 ADM Digital. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default function StartQuiz() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
