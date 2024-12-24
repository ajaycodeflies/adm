// src/app/admin/questions/page.js
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                                                        <Link
                                                            href={`/admin/questions/${question._id}`}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </Link>
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
        </AdminLayout>
    );
}
