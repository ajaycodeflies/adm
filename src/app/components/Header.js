"use client"

export default function Header() {
    return (
        <header className="d-flex py-3">
          <div className="align-items-center">
            <img src="/images/logo.png" alt="ADM Digital Logo" style={{ width: "70%", height:"100%" }} />
          </div>
          <div className="align-items-right">
            <button className="btn btn-outline-dark">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </header>
    );
}