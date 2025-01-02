import GenderSelector from "./components/GenderSelector";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="landing-screen">
        <section className="bg-container">
          <div className="top-bar">
            <div className="group-left">
              <Image
                className="logo"
                src="/images/logo.png"
                width={100}
                height={100}
                alt="User 1"
              />
              <a href="#" className="head-link">
                Home
              </a>
            </div>
            <div className="group-right">
              <a href="/user/login" className="head-btn">
                Login
              </a>
              <a href="#" className="head-btn-alt">
                Start Now
              </a>
            </div>
          </div>
          <div className="banner-row">
            {/* Left Content */}
            <div className="block-50">
              <div className="pill">
                <span>AI</span> ADM Digital <i className="bi bi-arrow-right"></i>
              </div>
              <h1>Become the Master of AI</h1>
              <p className="banner-text">
                Learn how AI can increase your income and improve your life.
              </p>
              <a href="#" className="main-btn">
                Start Now <i className="bi bi-chevron-right"></i>
              </a>
              <div className="users-joined">
                <div className="img-avatar-row">
                  <Image
                    className="img-avatar"
                    src="/images/user_avatar-1.jpg"
                    width={100}
                    height={100}
                    alt="User 1"
                  />
                  <Image
                    className="img-avatar"
                    src="/images/user_avatar-2.jpg"
                    width={100}
                    height={100}
                    alt="User 2"
                  />
                  <Image
                    className="img-avatar"
                    src="/images/user_avatar-3.jpg"
                    width={100}
                    height={100}
                    alt="User 3"
                  />
                  <Image
                    className="img-avatar"
                    src="/images/user_avatar-4.jpg"
                    width={100}
                    height={100}
                    alt="User 4"
                  />
                  <Image
                    className="img-avatar"
                    src="/images/user_avatar-5.jpg"
                    width={100}
                    height={100}
                    alt="User 5"
                  />
                </div>
                <p className="users-joined">
                  More than 373,317+ people joined
                </p>
              </div>
            </div>
            {/* Right Content */}
            <div className="block-50">
              <div className="img-box">
                <Image
                  className="img-banner"
                  src="/images/chatbot-img.jpg"
                  width={500}
                  height={500}
                  alt="Chatbot"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="box-container">
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <Header className="pi-1" />
          <section className="mt-4 pi-1 intro-screen-section">
            <h2 className="fw-bold text-uppercase main-heading">
              Career Freedom Challenge
            </h2>
            <p className="mt-2">
              Select Your{" "}
              <span className="fw-bold" style={{ color: "var(--blue-dark)" }}>
                Gender
              </span>
            </p>
            <p className="fw-bold text-secondary">1-Minute Quiz</p>
            <GenderSelector className="pi-1" />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
