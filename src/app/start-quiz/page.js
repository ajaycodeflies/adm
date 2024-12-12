
"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import "../globals.css";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmGender = searchParams.get("utm_gender");
  const step = searchParams.get("step");
  const isMale = utmGender === "m";

  const handleAgeClick = (ageGroup) => {
    router.push(`/start-quiz?utm_gender=${utmGender}&step=1`);
  };

  const handleQuizClick = (quizGroup) => {
    router.push(`/quiz?utm_gender=${utmGender}&step=1`);
  };

  if (step === "1") {
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <Header />
          <section className="my-5">
            <h2 className="fw-bold">More than 100,000</h2>
            <p className="mt-2">people have chosen Coursiv</p>
            <Image
              src="/images/social-proof_background.webp"
              width={1000}
              height={1000}
              alt="social-proof-background"
              className="img-fluid w-100"
            />
            <footer className="text-center mt-4 text-muted small">
              <button
                className="btn btn-blue"
                onClick={() => handleQuizClick("continue")}
              >
                Continue
              </button>
            </footer>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-4">
          <h2 className="fw-bold text-uppercase main-heading">Career Freedom Challenge</h2>
          <p className="mt-2">
          Select Your <span className="fw-bold" style={{ color: "var(--blue-dark)" }}>Age</span>
          </p>
          <p className="fw-bold text-secondary">1-Minute Quiz</p>
          <div className="row justify-content-center mt-4">
          {isMale ? (
              <>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                  <div className="card">
                    <Image src="/images/under-18-m.webp" width={100} height={100} alt="" />
                    <div className="card-body">
                      <button
                        className="btn btn-blue"
                        onClick={() => handleAgeClick("under-18")}
                      >
                        Under : 18 <i className="bi bi-arrow-right ms-2"></i>
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
                    <Image
                      src="/images/under-18-f.webp"
                      width={100}
                      height={100}
                      alt="Female under 18"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-blue"
                        onClick={() => handleAgeClick("under-18")}
                      >
                        Under: 18 <i className="bi bi-arrow-right ms-2"></i>
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
          <footer className="text-center mt-4 text-muted small">
            <p className="text-muted small mb-2">
              By choosing your age, you agree with{" "}
              <a href="/terms">Terms and Conditions</a>,{" "}
              <a href="/privacy">Privacy Policy</a>,{" "}
              <a href="/subscription">Subscription Terms</a>
            </p>
            <p>&copy; 2024 ADM Digital. All Rights Reserved.</p>
          </footer>
        </section>
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
