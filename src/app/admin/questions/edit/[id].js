// src/app/admin/questions/edit/[id].js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditQuestionPage() {
    console.log("EditQuestionPage");
    const router = useRouter();
    const { id } = useParams();
    const [question, setQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`/api/admin/questions/${id}`);
                const data = await response.json();

                if (data.success) {
                    setQuestion(data.question);
                    setOptions(data.question.options);
                } else {
                    setError("Failed to fetch question");
                }
            } catch (error) {
                setError("Failed to fetch question");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "question") {
            setQuestion({ ...question, question: value });
        } else {
            const updatedOptions = options.map((option, idx) =>
                idx === parseInt(name) ? { ...option, text: value } : option
            );
            setOptions(updatedOptions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/questions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: question.question,
                    options: options,
                }),
            });

            const data = await response.json();

            if (data.success) {
                router.push("/admin/questions");
            } else {
                setError("Failed to update question");
            }
        } catch (error) {
            setError("Failed to update question");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4">
                            <h3 className="mb-0 fw-bold">Edit Question</h3>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="question" className="form-label">
                                            Question
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="question"
                                            name="question"
                                            value={question.question}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Options</label>
                                        {options.map((option, index) => (
                                            <div key={index} className="mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={index.toString()}
                                                    value={option.text}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">
                                            Save Changes
                                        </button>
                                        <Link href="/admin/questions" className="btn btn-secondary">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
