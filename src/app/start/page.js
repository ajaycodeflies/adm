import GenderSelector from "../components/GenderSelector";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Start() {
  return (
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
  );
}

export default Start;
