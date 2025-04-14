"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function Courses() {
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editCourse, setEditCourse] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchCourses();
        }
    }, [router]);
    const fetchCourses = async () => {
        try {
            const response = await fetch("/api/admin/courses");
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses || []);
            } else {
                throw new Error("Failed to fetch courses.");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to fetch courses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (course) => {
        setEditCourse(course);
        setModalVisible(true);
    };

    // Function to handle saving the edited Course
    const saveEditCourse = async () => {
        try {
            const formData = new FormData();

            formData.append("courseId", editCourse._id);
            formData.append("title", editCourse.title);
            formData.append("name", editCourse.name);
            formData.append("status", editCourse.status);

            if (editCourse.image instanceof File) {
                formData.append("image", editCourse.image);
            }

            const response = await fetch(`/api/admin/courses/`, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedCourse = result?.course;

                if (updatedCourse) {
                    setCourses((prevCourses) =>
                        prevCourses.map((course) =>
                            course._id === updatedCourse._id ? updatedCourse : course
                        )
                    );
                    setToastMessage("Course updated successfully!");
                    setToastType("success");
                    setModalVisible(false);
                } else {
                    throw new Error("No course data returned");
                }
            } else {
                throw new Error(result.message || "Error updating course");
            }
        } catch (err) {
            setToastMessage(err.message || "Something went wrong!");
            setToastType("error");
        }
    };


    const closeModal = () => {
        setModalVisible(false);
        setEditCourse(null);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const deleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await fetch(`/api/admin/courses?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const result = await response.json();
                    setCourses(courses.filter((course) => course._id !== id));
                    setToastMessage("Course deleted successfully!");
                    setToastType("success");
                } else {
                    const error = await response.json();
                    setToastMessage("Failed to delete the course. Please try again.");
                    setToastType("error");
                }
            } catch (error) {
                setToastMessage("Failed to delete the course. Please try again.");
                setToastType("error");
            }
        }
    };

    if (loading) {
        return <p>Loading Courses...</p>;
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
                            <h3 className="mb-0 fw-bold">All Courses</h3>
                            <Link href="/admin/courses/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Add Course
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
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Course Name</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course, index) => (
                                            <tr key={course._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Image src={course.image} alt={course.title} className="img" height={80} width={80} />
                                                </td>
                                                <td>{course.title}</td>
                                                <td>{course.name}</td>
                                                <td>
                                                    {course.status === "1" ? (
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
                                                    }).format(new Date(course.created_at))}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => openEditModal(course)}
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deleteCourse(course._id)}
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
                                <h5 className="modal-title text-white">Edit Course</h5>
                                <button
                                    type="button"
                                    className="btn-close text-red"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editCourse.title}
                                        onChange={(e) =>
                                            setEditCourse({ ...editCourse, title: e.target.value })
                                        }
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editCourse.name}
                                        onChange={(e) =>
                                            setEditCourse({ ...editCourse, name: e.target.value })
                                        }
                                        placeholder="Enter course name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={editCourse.status}
                                        onChange={(e) =>
                                            setEditCourse({ ...editCourse, status: e.target.value })
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setEditCourse({
                                                ...editCourse,
                                                image: e.target.files[0],
                                            })
                                        }
                                    />
                                    {editCourse.image && (
                                        <Image
                                            src={
                                                typeof editCourse.image === 'string'
                                                    ? editCourse.image
                                                    : URL.createObjectURL(editCourse.image)
                                            }
                                            alt="{editCourse.name}"
                                            width={80}
                                            height={80}
                                            className="mt-2"
                                        />
                                    )}
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
                                    onClick={saveEditCourse}
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

