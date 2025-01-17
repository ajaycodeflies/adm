"use client";
import Header from "@/app/components/Header";
import NavBottom from "@/app/components/NavBottom";
import Image from "next/image";
import Link from "next/link";

export default function Guides() {
  return (
    <>
      <div className="box-container">
        <Header />
        <div className="box-inner-content">
          <h5 className="my-3">Pick up where you left</h5>
          <div className="card-course-continue">
            <Image
              src="/images/icons/artificial-intelligence.png"
              alt="course-preview"
              width={200}
              height={100}
            />
            <h6>AI Mastery</h6>
            <p>ChatGPT</p>
            <div className="progress-container">
              <div className="progress">
                <div className="progress-bar" style={{ width: "50%" }}></div>
              </div>
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <Link href="#">Continue Learing</Link>
          </div>
          <h5 className="my-3 heading-with-btn">
            Pick up where you left
            <a href="./recommended" className="heading-btn">
              See All
            </a>
          </h5>
          <div className="card-course-ingrid">
            <div className="card-course">
              <Image
                src="/images/icons/artificial-intelligence.png"
                alt="course-preview"
                width={200}
                height={100}
              />
              <p>ChatGPT</p>
              <h6>Lessons 16 - 3 Levels</h6>
              <div className="progress">
                <div className="progress-bar" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div className="card-course">
              <Image
                src="/images/icons/ai.png"
                alt="course-preview"
                width={200}
                height={100}
              />
              <p>MidJourney</p>
              <h6>Lessons 16 - 3 Levels</h6>
              <div className="progress">
                <div className="progress-bar" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>
          
          <h5 className="my-3 heading-with-btn">
            Recommended For You
            <a href="./recommended" className="heading-btn">
              See All
            </a>
          </h5>
          <div className="card-course-ingrid">
            <div className="card-course">
              <Image
                src="/images/icons/artificial-intelligence-c1.png"
                alt="course-preview"
                width={200}
                height={100}
              />
              <p>First Steps to Profit with AI</p>
              <h6>Lessons 16 - 3 Levels</h6>
            </div>
            <div className="card-course">
              <Image
                src="/images/icons/money.png"
                alt="course-preview"
                width={200}
                height={100}
              />
              <p>Earning Through ChatGPT-4 in SMM</p>
              <h6>Lessons 16 - 3 Levels</h6>
            </div>
          </div>
        </div>
        <NavBottom />
      </div>
    </>
  );
}
