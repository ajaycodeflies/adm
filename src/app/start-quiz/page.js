"use client";

import GenderSelector from "../components/GenderSelector";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

const ageGroups = [
  { label: "Under 18", value: "under-18" },
  { label: "18-24", value: "18-24" },
  { label: "25-34", value: "25-34" },
  { label: "35-44", value: "35-44" },
  { label: "45+", value: "45" },
];

const QuizContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const utmGender = searchParams.get("utm_gender");
  const step = searchParams.get("step");

  const handleClick = (params) => {
    const query = new URLSearchParams(params).toString();
    router.push(`/start-quiz?${query}`);
  };

  if (step === "1") {
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center text-center h-100">
          <Header />
          <section className="mt-2 inside-box">
            <div className="bg-note">
              <h2 className="fw-bold">100,000+ people</h2>
              <p>already use ADM Digital</p>
              <blockquote className="quot-box">
                &quot;AI Won&apos;t Replace Humans — But Humans With AI Will Replace Humans Without AI&quot;
                <Image
                  src="/images/hw_social-proof_harvard_logo.webp"
                  alt="Harvard University"
                  width={100}
                  height={35}
                  className="mt-2"
                />
              </blockquote>
              <div className="py-4">
                <p className="font-semibold">Latest AI tools mentioned in</p>
                <Image
                  src="/images/hw_social-proof_source_logo.webp"
                  width={320}
                  height={50}
                  alt="Source Logos"
                  className="m-auto"
                />
              </div>
            </div>
            <div className="button-continue">
              <button
                type="button"
                onClick={() => router.push(`/quiz?utm_gender=${utmGender}&step=1`)}
                className="head-btn-alt btn-alt mb-2 text-uppercase"
              >
                Continue <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (utmGender) {
    return (
      <div className="box-container">
        <div className="d-flex flex-column align-items-center text-center">
          <Header />
          <section className="mt-5">
            <h2 className="fw-bold text-uppercase">AI-Driven income growth challenge</h2>
            <p className="text-uppercase">Select Your <strong>age</strong></p>
            <p className="fw-bold">1-Minute Quiz</p>
            <div className="row justify-content-center mt-4">
              {ageGroups.map(({ label, value }) => (
                <div key={value} className="col-6 mb-3">
                  <div className="card" onClick={() => handleClick({ utm_gender: utmGender, age: value, step: "1" })}>
                    <Image
                      src={`/images/${value}-${utmGender[0]}.webp`}
                      width={100}
                      height={100}
                      alt={`${utmGender} ${label}`}
                    />
                    <div className="card-body">
                      <button className="btn btn-blue">
                        Age: {label} <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }

  // Default: Gender Selector
  const genderOptions = [
    { label: "Male", value: "male", img: "picker_male_18-24.webp" },
    { label: "Female", value: "female", img: "picker_female_18-24.webp" },
    { label: "Not To Say", value: "other", img: "other.png" },
  ];

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center text-center">
        <Header />
        <section className="mt-5">
          <h2 className="fw-bold text-uppercase">AI-Driven income growth challenge</h2>
          <p className="text-uppercase">Select Your <strong>Gender</strong></p>
          <p className="fw-bold">1-Minute Quiz</p>
          <div className="row justify-content-center mt-4">
            {genderOptions.map(({ label, value, img }) => (
              <div key={value} className="col-6 mb-3">
                <div className="card">
                  <Image src={`/images/${img}`} alt={label} width={100} height={100} />
                  <div className="card-body">
                    <button className="btn btn-blue" onClick={() => handleClick({ utm_gender: value })}>
                      {label} <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default function StartQuiz() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
