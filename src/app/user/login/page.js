"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function UserLogin() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="d-flex flex-column align-items-center justify-content-center bg-light py-5">

            <div className="mb-3">
                <img src="/images/logo.png" alt="Logo" className="img-fluid w-20 mx-auto d-block opacity-90" style={{ maxWidth: "20%" }} />
            </div>

            <div className="card p-4 shadow-sm  border-0" style={{ width: "400px" }}>


                <form className="w-100 h-100 d-flex flex-column justify-content-center align-items-stretch">

                    <h2 class="text-start fw-bold mb-4 onboarding-page-title">User Login</h2>

                    <div className="mb-4 custom-form-control">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4 custom-form-control">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                backgroundColor: "#fff"
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="mb-4">
                        <Link href="/">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn btn-blue w-100 custom-form-btn">
                        Login
                    </button>
                </form>
            </div>


        </main>
    );
}
