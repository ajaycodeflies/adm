"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import ShowToast from "../components/ShowToast";
import Link from "next/link";

export default function LabelPage() {
    const router = useRouter();
    const [labels, setlabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editLabel, setEditLabel] = useState(null); // Holds the Label being edited
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
            setToastMessage(message);
        }, 10);
    };

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchLabels();
        }
    }, [router]);

    // Function to fetch labels from the API
    const fetchLabels = async () => {
        try {
            const response = await fetch("/api/admin/labels");
            if (response.ok) {
                const data = await response.json();
                setlabels(data.labels || []);
            } else {
                throw new Error("Failed to fetch labels.");
            }
        } catch (error) {
            console.error("Error fetching labels:", error);
            setError("Failed to fetch labels. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle opening the edit modal
    const openEditModal = (label) => {
        setEditLabel(label);
        setModalVisible(true);
    };

    // Function to handle saving the edited label
    const saveEditLabel = async () => {
        if (!editLabel || !editLabel.label || editLabel.label.trim().length === 0) {
            return showToast("Label name cannot be empty.", "error");
        }
        try {
            const response = await fetch(`/api/admin/labels/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    labelId: editLabel._id,
                    label: editLabel.label,
                }),
                timeout: 10000,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedLabel = result?.label;
                if (updatedLabel) {
                    setlabels((prevLabels) =>
                        prevLabels.map((label) => (label._id === updatedLabel._id ? updatedLabel : label))
                    );
                    setModalVisible(false);
                    showToast("Label updated successfully", "success");
                } else {
                    console.error("No label data returned");
                    const error = result.error || "Failed to update the label. Please try again.";
                    showToast(error, "error");
                }
            } else {
                console.error(result.error || "Error updating label");
                showToast(result.error || "Failed to update the label. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error saving label:", error);
            showToast("Failed to update the label. Please try again.", "error");
        }
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setModalVisible(false);
        setEditLabel(null);
    };

    // Function to delete a label
    const deleteLabel = async (id) => {
        if (window.confirm("Are you sure you want to delete this label?")) {
            try {
                const response = await fetch(`/api/admin/labels?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const result = await response.json();
                    setlabels(labels.filter((label) => label._id !== id));
                    showToast("Label deleted successfully", "error");
                } else {
                    const error = await response.json();
                    console.error("Failed to delete the label. Please try again.");
                    showToast(error.message, "error");
                }
            } catch (error) {
                console.error("Error deleting label:", error);
                showToast("Failed to delete the label. Please try again.", "error");
            }
        }
    };

    if (loading) {
        return <p>Loading labels...</p>;
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
                            <h3 className="mb-0 fw-bold">All Question labels</h3>
                            <Link href="/admin/questions/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Add label
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100">
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labels.map((label, index) => (
                                            <tr key={label._id}>
                                                <td>{index + 1}</td>
                                                <td>{label.label}</td>
                                                <td>
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    }).format(new Date(label.createdAt))}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => openEditModal(label)}
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deleteLabel(label._id)}
                                                    >
                                                        Delete
                                                    </button>
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

            {/* Edit Label Modal */}
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '700px' }}>
                        <div className="modal-content shadow-lg rounded-3">
                            <div className="modal-header">
                                <h5 className="modal-title text-white">Edit Label</h5>
                                <button
                                    type="button"
                                    className="btn-close text-red"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">Label Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLabel.label}
                                        onChange={(e) =>
                                            setEditLabel({ ...editLabel, label: e.target.value })
                                        }
                                        placeholder="Enter label name"
                                    />
                                </div>

                            </div>
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
                                    onClick={saveEditLabel}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Toast message component */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}
