"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Quiz() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 18;

    const goals = [
        { id: 1, label: "Grow wealth", image: "/images/step1/male/1.webp" },
        { id: 2, label: "Be my own boss", image: "/images/step1/male/2.webp" },
        { id: 3, label: "Financial freedom", image: "/images/step1/male/3.webp" },
        { id: 4, label: "Travel the world", image: "/images/step1/male/4.webp" },
        { id: 5, label: "Professional growth", image: "/images/step1/male/5.webp" },
        { id: 6, label: "Work-life balance", image: "/images/step1/male/6.webp" },
    ];

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        } else {
            router.back(); // Go back to the previous page
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <header className="w-100 d-flex align-items-center justify-content-between py-3">
                    <button
                        className="btn btn-light"
                        onClick={handlePreviousStep}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                    <img src="/images/logo.png" alt="ADM Digital Logo" style={{ width: "50%", height:"100%" }} />
                    {/* <h3 className="text-primary"></h3> */}
                    <p className="text-muted">{`${currentStep}/${totalSteps}`}</p>
                </header>

                {/* Progress Bar */}
                <div className="progress w-100 mt-2" style={{ height: "8px" }}>
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        aria-valuenow={currentStep}
                        aria-valuemin="0"
                        aria-valuemax={totalSteps}
                    ></div>
                </div>

                <section className="text-center mt-4 w-100 px-4">
                    <h2 className="fw-bold">What is your main goal?</h2>
                </section>

                <section className="d-flex flex-column align-items-center w-100 mt-3 px-3">
                    {goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="card border-0 shadow-sm mb-3 d-flex flex-row align-items-center px-3 py-2 w-100"
                            style={{ maxWidth: "600px", borderRadius: "10px" }}
                            onClick={handleNextStep}
                        >
                            <img
                                src={goal.image}
                                alt={goal.label}
                                className="rounded-circle me-3"
                                style={{ width: "60px", height: "60px" }}
                            />
                            <h5 className="mb-0 fw-bold">{goal.label}</h5>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
