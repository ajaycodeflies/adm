import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function result() {
  return (
    <div className="box-container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">
        <Header />
        <section className="mt-4">
          <h2 className="fw-bold text-uppercase main-heading" >Result Are Pending</h2>

        </section>
      </div>
    </div>
  );
}
