"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";

export default function ProfilePage() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([
        { text: "", value: "" },
        { text: "", value: "" },
        { text: "", value: "" },
        { text: "", value: "" },
    ]);
    const [category, setCategory] = useState("");
    const router = useRouter();

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question || options.some((opt) => !opt.text || !opt.value)) {
            alert("Please fill all fields for the question and options.");
            return;
        }

        const payload = {
            question,
            options,
            category,
        };

        try {
            const response = await fetch("/api/admin/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Question added successfully!");
                setQuestion("");
                setOptions([
                    { text: "", value: "" },
                    { text: "", value: "" },
                    { text: "", value: "" },
                    { text: "", value: "" },
                ]);
                setCategory("");
            } else {
                alert("Failed to add question.");
            }
        } catch (error) {
            console.error("Error adding question:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <h3 className="mb-0 fw-bold">Add Assessment Question</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-6 col-lg-12 col-md-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Enter Question</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                placeholder="Enter the question text"
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Options</label>
                                            {options.map((option, index) => (
                                                <div key={index} className="mb-2">
                                                    <div className="input-group">
                                                        <span className="input-group-text">{index + 1}</span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={option.text}
                                                            onChange={(e) =>
                                                                handleOptionChange(index, "text", e.target.value)
                                                            }
                                                            placeholder={`Option ${index + 1} text`}
                                                        />
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={option.value}
                                                            onChange={(e) =>
                                                                handleOptionChange(index, "value", e.target.value)
                                                            }
                                                            placeholder={`Option ${index + 1} value`}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category (Optional)</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Enter category (e.g., Career, Flexibility)"
                                            />
                                        </div>
                                        <div className="mt-3 text-center">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
