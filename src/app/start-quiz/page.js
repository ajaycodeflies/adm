"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import Header from '../components/Header';

export default function StartQuiz() {
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
  }

  if (step === "1") {
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <Header />
          <section className="mt-4">
            <h2 className="fw-bold">More than 100,000</h2>
            <p className="mt-2">people have chosen Coursiv</p>
            <img
              src="/images/social-proof_background.webp"
              className="card-img-top"
              alt="social-proof-background"
            />
            <footer className="text-center mt-4 text-muted small">
              <button
                className="btn btn-info btn-action p-4"
                onClick={() => handleQuizClick("continue")}
              >
                <span className='label-text-all-on-primary text-base font-semibold uppercase'>continue</span>
              </button>
            </footer>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-4">
          <h2 className="fw-bold">CAREER FREEDOM CHALLENGE</h2>
          <p className="mt-2">
            SELECT YOUR <span className="text-primary fw-bold">AGE</span>
          </p>
          <p className="fw-bold text-secondary">1-MINUTE QUIZ</p>

          <div className="row justify-content-center mt-4">
            {isMale ? (
              <>
              <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/under-18-m.avif"
                      className="card-img-top"
                      alt="Male under 18"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("under-18")}
                      >
                        Under : 18 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_male_18-24.webp"
                      className="card-img-top"
                      alt="Male 18-24"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("18-24")}
                      >
                        Age: 18-24 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_male_25-34.webp"
                      className="card-img-top"
                      alt="Male 25-34"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("25-34")}
                      >
                        Age: 25-34 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_male_35-44.webp"
                      className="card-img-top"
                      alt="Male 35-44"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("35-44")}
                      >
                        Age: 35-44 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_male_45.webp"
                      className="card-img-top"
                      alt="Male 45+"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
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
              <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/under-18-f.avif"
                      className="card-img-top"
                      alt="Female under 18"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("under-18")}
                      >
                        Under: 18 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_female_18-24.webp"
                      className="card-img-top"
                      alt="Female 18-24"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("18-24")}
                      >
                        Age: 18-24 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_female_25-34.webp"
                      className="card-img-top"
                      alt="Female 25-34"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("25-34")}
                      >
                        Age: 25-34 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_female_35-44.webp"
                      className="card-img-top"
                      alt="Female 35-44"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleAgeClick("35-44")}
                      >
                        Age: 35-44 <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card border-primary">
                    <img
                      src="/images/picker_female_45.webp"
                      className="card-img-top"
                      alt="Female 45+"
                    />
                    <div className="card-body">
                      <button
                        className="btn btn-primary w-100"
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
          <p className="text-muted small">
            By choosing your age, you agree with{" "}
            <a href="/terms" className="text-primary">Terms and Conditions</a>,{" "}
            <a href="/privacy" className="text-primary">Privacy Policy</a>,{" "}
            <a href="/subscription" className="text-primary">Subscription Terms</a>
          </p>
          <footer className="text-center mt-4 text-muted small">
            Coursiv Limited. Limassol, Cyprus
          </footer>
        </section>
      </div>
    </div>
  );
}
