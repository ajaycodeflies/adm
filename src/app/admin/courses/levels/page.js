"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import ShowToast from "../../components/ShowToast";
import Link from "next/link";

export default function Levels() {
    const [levels, setLevels] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editLevel, setEditLevel] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
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
        fetchCourses();
        fetchLevels();
    });

    const fetchCourses = async () => {
        const response = await fetch("/api/admin/courses");
        if (response.ok) {
            const data = await response.json();
            setCourses(data.courses);
        } else {
            throw new Error("Failed to fetch courses.");
        }
    }
    const fetchLevels = async () => {
        try {
            const response = await fetch("/api/admin/courses/levels");
            if (response.ok) {
                const data = await response.json();
                setLevels(data.levels);
            } else {
                throw new Error("Failed to fetch levels.");
            }
        } catch (error) {
            console.error("Error fetching levels:", error);
            setError("Failed to fetch levels. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (level) => {
        setEditLevel({
            ...level,
            course: level.course_id || "",
        });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditLevel(null);
    };

    // Function to handle saving the edited Level
    const saveEditLevel = async () => {
        try {
            if (!editLevel || !editLevel._id) {
                showToast("Invalid level data.", "error");
                return;
            }

            const { course, step, title, status } = editLevel;

            if (!course || !step || !title || !status) {
                showToast("All fields are required.", "error");
                return;
            }

            const formData = new FormData();
            formData.append("levelId", editLevel._id);
            formData.append("course", course);
            formData.append("step", step);
            formData.append("title", title);
            formData.append("status", status);

            const response = await fetch(`/api/admin/courses/levels`, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedLevel = result?.level;

                if (updatedLevel) {
                    // setLevels((prevLevels) =>
                    //     prevLevels.map((level) =>
                    //         level._id === updatedLevel._id
                    //             ? {
                    //                 ...level,
                    //                 ...updatedLevel,
                    //                 course_details: level.course_details,
                    //             }
                    //             : level
                    //     )
                    // );
                    fetchLevels();
                    showToast("Level updated successfully!", "success");
                    setModalVisible(false);
                } else {
                    const errorMessage = result?.message || "Error updating level";
                    showToast(errorMessage, "error");
                }
            } else {
                const error = await response.json();
                showToast(error.message || "Failed to update the level. Please try again.", "error");
            }
        } catch (err) {
            showToast("Something went wrong. Please try again.", "error");
        }
    };


    const deleteLevel = async (id) => {
        if (window.confirm("Are you sure you want to delete this level?")) {
            try {
                const response = await fetch(`/api/admin/courses/levels?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const result = await response.json();
                    setLevels(levels.filter((level) => level._id !== id));
                    const errorMessage = result?.message || "Deleted successfully!";
                    showToast(errorMessage, "success");
                } else {
                    const errorMessage = await response.json();
                    showToast(error.message || "Failed to delete the level. Please try again.", "error");
                }
            } catch (error) {
                showToast("Something went wrong. Please try again.", "error");
            }
        }
    };

    if (loading) {
        return <p>Loading levels...</p>;
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
                            <h3 className="mb-0 fw-bold">All levels</h3>
                            <Link href="/admin/courses/levels/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Add Level
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 ">
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Course</th>
                                            <th>Step Level</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {levels.map((level, index) => (
                                            <tr key={level._id}>
                                                <td>{index + 1}</td>
                                                <td>{level.course_details?.name || "N/A"}</td>
                                                <td>{level.step}</td>
                                                <td>{level.title}</td>
                                                <td>
                                                    {level.status === "1" ? (
                                                        <span className="badge badge-success">Active</span>
                                                    ) : (
                                                        <span className="badge badge-danger">Inactive</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    }).format(new Date(level.created_at))}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => openEditModal(level)}
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deleteLevel(level._id)}
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

            {/* Edit Modal */}
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '700px' }}>
                        <div className="modal-content shadow-lg rounded-3">
                            <div className="modal-header">
                                <h5 className="modal-title text-white">Edit Level</h5>
                                <button
                                    type="button"
                                    className="btn-close text-red"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">Select Course <span className="text-danger">*</span> </label>
                                    <select
                                        className="form-select"
                                        value={editLevel.course}
                                        onChange={(e) =>
                                            setEditLevel({ ...editLevel, course: e.target.value })
                                        }
                                    >
                                        <option value="">-- Select --</option>
                                        {courses.map((course) => (
                                            <option key={course._id} value={course._id}>
                                                {course.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Step Level <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLevel.step}
                                        onChange={(e) =>
                                            setEditLevel({ ...editLevel, step: e.target.value })
                                        }
                                        placeholder="Enter level"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLevel.title}
                                        onChange={(e) =>
                                            setEditLevel({ ...editLevel, title: e.target.value })
                                        }
                                        placeholder="Enter title"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={editLevel.status}
                                        onChange={(e) =>
                                            setEditLevel({ ...editLevel, status: e.target.value })
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
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
                                    onClick={saveEditLevel}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Toaster Message Component */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}

