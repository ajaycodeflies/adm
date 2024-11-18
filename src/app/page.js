import "bootstrap/dist/css/bootstrap.min.css";
import GenderSelector from './components/GenderSelector';
import Image from "next/image";

export default function Home() {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center text-center">
      <header className="d-flex">
        <div className="align-items-center">
          <Image src="/images/logo.svg" alt="Coursiv Logo" width={100} height={100} />
        </div>
        <div className="align-items-right">
        <button className="btn btn-outline-dark">
          <i className="bi bi-list"></i>
        </button>
        </div>
      </header>
      <section className="mt-4">
        <h2 className="fw-bold">CAREER FREEDOM CHALLENGE</h2>
        <p className="mt-2">
          SELECT YOUR <span className="text-primary fw-bold">GENDER</span>
        </p>
        <p className="fw-bold text-secondary">1-MINUTE QUIZ</p>

        <GenderSelector />
        
        <p className="text-muted small">
          By clicking "Male" or "Female", you agree with{" "}
          <a href="/terms" className="text-primary">Terms and Conditions</a>,{" "}
          <a href="/privacy" className="text-primary">Privacy Policy</a>,{" "}
          <a href="/subscription" className="text-primary">Subscription Terms</a>
        </p>
        <footer className="text-center mt-4 text-muted small">
          Coursiv product by Coursiv Limited. 2024 © All Rights Reserved.
        </footer>
      </section>
    </main>
  );
}
