import GenderSelector from './components/GenderSelector';
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-4">
          <h2 className="fw-bold">CAREER FREEDOM CHALLENGE</h2>
          <p className="mt-2">
            SELECT YOUR <span className="fw-bold" style={{ "color": "var(--blue-dark)" }}>GENDER</span>
          </p>
          <p className="fw-bold text-secondary">1-MINUTE QUIZ</p>
          <GenderSelector />
          <Footer />
        </section>
      </div>
    </div>
  );
}
