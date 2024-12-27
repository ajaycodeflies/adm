import { useState, useEffect } from "react";
import Header from "./Header";

export default function Loader({ onComplete }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 0);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <div className="loader-container">
          <div className="progress-circle">
            <div className="circle" style={{ "--percentage": percentage }}>
              <span className="percentage-text">{percentage}%</span>
            </div>
          </div>
          <div className="challenge-section mt-4">
            <p>Creating your personal challenge...</p>
            <h2>100,000+ people have chosen ADM</h2>
            <div className="testimonial-card mt-3">
              <div className="testimonial-rating">
                <span className="stars">⭐⭐⭐⭐</span>
              </div>
              <blockquote>
              &quot;ADM enables individuals at all levels of expertise to easily
                understand complicated AI topics.&quot;
              </blockquote>
              <p>- Tina</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
