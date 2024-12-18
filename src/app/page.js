import GenderSelector from './components/GenderSelector';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-4">
          <h2 className="fw-bold text-uppercase main-heading" >Career Freedom Challenge</h2>
          <p className="mt-2">
            Select Your <span className="fw-bold" style={{ "color": "var(--blue-dark)" }}>Gender</span>
          </p>
          <p className="fw-bold text-secondary">1-Minute Quiz</p>
          <GenderSelector />
          <Footer />
        </section>
      </div>
    </div>
  );
}
