"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function QuestionsPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);  // Change initial state to false, not true
    const [error, setError] = useState("");
    const [toastMessage, setToastMessage] = useState("");  // For Toast message
    const [toastType, setToastType] = useState("");  // To define message type (success/error)

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/admin/questions");
                const data = await response.json();

                if (data.success) {
                    setQuestions(data.questions);
                } else {
                    setError("Failed to fetch questions");
                }
            } catch (error) {
                setError("Failed to fetch questions");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const deleteQuestion = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setLoading(true);
            try {
                const response = await fetch(`/api/admin/questions?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const result = await response.json();
                    setToastMessage("Question deleted successfully");
                    setToastType("success"); // Set success type for the toast
                    setQuestions(questions.filter((question) => question._id !== id));
                } else {
                    const error = await response.json();
                    setToastMessage(error.message || "Failed to delete the question");
                    setToastType("error"); // Set error type for the toast
                }
            } catch (error) {
                console.error("Error deleting question:", error);
                setToastMessage("Failed to delete the question. Please try again.");
                setToastType("error");
            } finally {
                setLoading(false);
                setTimeout(() => setToastMessage(""), 5000); // Hide message after 5 seconds
            }
        }
    };

    if (loading) {
        return <p>Loading questions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 d-flex justify-content-between align-items-center">
                            <h3 className="mb-0 fw-bold">Assessments Questions List</h3>
                            <Link href="/admin/questions/create" className="btn btn-sm btn-blue"><i className="bi bi-plus-lg"></i> Add More</Link>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 card">
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Question</th>
                                            <th>Options</th>
                                            <th>Position</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.map((question, index) => (
                                            <tr key={question._id}>
                                                <td className="align-middle">{index + 1}</td>
                                                <td className="align-middle">{question.question}</td>
                                                <td className="align-middle">
                                                    {question.options.map((option, idx) => (
                                                        <div key={idx} className="d-flex align-items-center py-2">
                                                            {option.image && (
                                                                <Image
                                                                    src={option.image}
                                                                    alt={`Option ${idx}`}
                                                                    width={40}
                                                                    height={40}
                                                                    style={{ marginRight: "10px" }}
                                                                    className="rounded-circle"
                                                                />
                                                            )}
                                                            {option.text}
                                                        </div>
                                                    ))}
                                                </td>

                                                <td className="align-middle">{question.position || index + 1}</td>
                                                <td className="align-middle">
                                                    <div className="dropdown">
                                                        <Link href={`/admin/questions/edit/${question._id}`} className="btn btn-sm btn-primary">
                                                            Edit
                                                        </Link>

                                                        &nbsp;
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => deleteQuestion(question._id)}
                                                            disabled={loading}
                                                        > Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toaster Message */}
            {toastMessage && (
                <div className={`toast-message ${toastType}`}>
                    <p>{toastMessage}</p>
                </div>
            )}

        </AdminLayout>
    );
}
