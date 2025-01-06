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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [editQuestion, setEditQuestion] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [labels, setLabels] = useState([]);


    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        }
    }, [router]);

    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await fetch("/api/admin/labels");
                const data = await response.json();
                if (data.success) {
                    setLabels(data.labels);
                } else {
                    setError("Failed to fetch labels");
                }
            } catch (error) {
                setError("Failed to fetch labels");
            } finally {
                setLoading(false);
            }
        };

        fetchLabels();
    }, []);

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

    const openEditModal = (question) => {
        setEditQuestion(question);
        setModalVisible(true);
    };

    const saveEditQuestion = async () => {
        try {
            const formData = new FormData();
            formData.append("questionId", editQuestion._id);
            formData.append("label", editQuestion.label);
            formData.append("question", editQuestion.question);

            editQuestion.options.forEach((option, index) => {
                formData.append(`options[${index}][text]`, option.text);
                formData.append(`options[${index}][value]`, option.value);
            });

            if (editQuestion.image) {
                formData.append("image", editQuestion.image);
            }

            const response = await fetch(`/api/admin/questions/`, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedQuestion = result?.question;
                
                if (updatedQuestion) {
                    setQuestions((prevQuestions) =>
                        prevQuestions.map((question) =>
                            question._id === updatedQuestion._id ? updatedQuestion : question
                        )
                    );
                    setToastMessage("Question updated successfully!");
                    setToastType("success");
                    setModalVisible(false);
                } else {
                    throw new Error("No question data returned");
                }
            } else {
                throw new Error(result.error || "Error updating question");
            }
        } catch (err) {
            setToastMessage(err.message);
            setToastType("error");
        }
    };
    
    const closeModal = () => {
        setModalVisible(false);
        setEditQuestion(null);
    };

    const handleOptionChange = (index, field, value) => {
        const updatedOptions = [...editQuestion.options];
        updatedOptions[index][field] = value;
        setEditQuestion({ ...editQuestion, options: updatedOptions });
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = editQuestion.options.filter((_, i) => i !== index);
        setEditQuestion({ ...editQuestion, options: updatedOptions });
    };

    const handleAddOption = () => {
        setEditQuestion({ ...editQuestion, options: [...editQuestion.options, { text: "", value: "" }] });
    };

    const deleteQuestion = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setLoading(true);
            try {
                const response = await fetch(`/api/admin/questions?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setQuestions(questions.filter((question) => question._id !== id));
                    setToastMessage("Question deleted successfully");
                    setToastType("success");
                } else {
                    throw new Error("Failed to delete the question");
                }
            } catch (err) {
                setToastMessage(err.message);
                setToastType("error");
            } finally {
                setLoading(false);
            }
        }
    };

    // Automatically hide the toast after 5 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

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
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questions.map((question, index) => (
                                            <tr key={question._id}>
                                                <td className="align-middle">{index + 1}</td>
                                                <td className="align-middle">
                                                    <div>
                                                        <div className="badge bg-success my-2">
                                                            {question.labelDetails.label}
                                                        </div>
                                                        <br />
                                                        <strong className="fw-bold">{question.question}</strong>
                                                        <br />
                                                        <div className="d-flex flex-wrap align-content-between my-2">
                                                            {question.options.map((option, idx) => (
                                                                <div key={idx} className="d-flex align-items-center me-3">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`option-${idx}`}
                                                                        className="me-2"
                                                                    />
                                                                    <label htmlFor={`option-${idx}`}>{option.text}</label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>


                                                <td className="align-middle">
                                                    {question.image && (
                                                        <Image
                                                            src={question.image}
                                                            alt="Question Image"
                                                            width={80}
                                                            height={80}
                                                            className=""
                                                        />
                                                    )}
                                                </td>
                                                <td className="align-middle">
                                                    <div className="dropdown">
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => openEditModal(question)}
                                                        >
                                                            Edit
                                                        </button>

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
            {/* Edit Modal */}
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '1000px' }}>
                        <div className="modal-content shadow-lg rounded-3">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Question</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    {/* Label Dropdown */}
                                    <label className="form-label">Select Label</label>
                                    <select
                                        className="form-select"
                                        value={editQuestion.label}
                                        onChange={(e) =>
                                            setEditQuestion({ ...editQuestion, label: e.target.value })
                                        }
                                    >
                                        <option value="">Select Label</option>
                                        {labels.map((label) => (
                                            <option key={label._id} value={label._id}>
                                                {label.label}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Question Input */}
                                    <label className="form-label mt-3">Question Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editQuestion.question}
                                        onChange={(e) =>
                                            setEditQuestion({ ...editQuestion, question: e.target.value })
                                        }
                                        placeholder="Enter question name"
                                    />

                                    {/* Options Management */}
                                    <label className="form-label mt-3">Options</label>
                                    {editQuestion.options.map((option, idx) => (
                                        <div key={idx} className="input-group mb-2">
                                            {/* Option Text */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={option.text}
                                                onChange={(e) =>
                                                    handleOptionChange(idx, 'text', e.target.value)
                                                }
                                                placeholder="Option Text"
                                            />

                                            {/* Option Value */}
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={option.value}
                                                onChange={(e) =>
                                                    handleOptionChange(idx, 'value', e.target.value)
                                                }
                                                placeholder="Option Value"
                                            />

                                            {/* Remove Button (Hidden for Fixed Option) */}
                                            {idx !== 0 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveOption(idx)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {/* Add Option Button */}
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm mt-3"
                                        onClick={handleAddOption}
                                    >
                                        Add Option
                                    </button>
                                    <br />
                                    {/* Image Upload */}
                                    <label className="form-label mt-3">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setEditQuestion({
                                                ...editQuestion,
                                                image: e.target.files[0],
                                            })
                                        }
                                    />
                                    {editQuestion.image && (
                                        <Image
                                            src={
                                                typeof editQuestion.image === 'string'
                                                    ? editQuestion.image
                                                    : URL.createObjectURL(editQuestion.image)
                                            }
                                            alt="Question Image"
                                            width={80}
                                            height={80}
                                            className="mt-2"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={saveEditQuestion}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Toaster Message */}
            {toastMessage && (
                <div className={`toast-message ${toastType}`}>
                    <p>{toastMessage}</p>
                </div>
            )}

        </AdminLayout>
    );
}
