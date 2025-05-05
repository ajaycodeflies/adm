
"use client";

import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../../components/AdminLayout";
import ShowToast from "../../../components/ShowToast";
import Link from "next/link";

export default function CourseCreate() {
    const [course, setCourse] = useState("");
    const [step, setStep] = useState("");
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState([]);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const formRef = useRef(null);

    const showToast = (message, type = "error") => {
        setToastMessage("");
        setToastType(type);
        setTimeout(() => {
          setToastMessage(message);
        }, 10);
      };

    useEffect(() => {fetchCourses()});
    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/admin/courses");
            const data = await res.json();
            if (data.courses) {
                setCourses(data.courses);
            } else {
                setCourses([]);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!course.trim()) {
            newErrors.course = "Course is required";
        }

        if (!step.trim()) {
            newErrors.step = "Step is required"
        }

        if (!title.trim()) {
            newErrors.title = "Title is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        const formData = new FormData();

        formData.append("course", course);
        formData.append("title", title);
        formData.append("step", step);

        try {
            const response = await fetch("/api/admin/courses/levels", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setCourse("");
                setTitle("");
                setStep("");
                if (formRef.current) {
                    formRef.current.reset();
                }
                showToast("Level added successfully!", "success");
            } else {
                const errorMessage = data.message || "Failed to add Level. Please try again.";
                showToast(errorMessage, "error");
            }
        } catch (error) {
            console.error("Error adding Level:", error);
            const errorMessage = error.message || "Failed to add Level. Please try again.";
            showToast(errorMessage, "error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="bg-white rounded-bottom smooth-shadow-sm">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <h3 className="mb-0 fw-bold">Add Level</h3>
                                <Link href="/admin/courses/levels" className="btn btn-sm btn-blue">
                                    <i className="bi bi-list"></i> Level List 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-8 col-lg-12 col-md-12 col-12">
                            <div className="card-form">
                                <div className="card-body">
                                    <form ref={formRef} onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <div className="mb-3">
                                                <label className="form-label">Select Course <span className="text-danger">*</span> </label>
                                                <select
                                                    className="form-select"
                                                    value={course}
                                                    onChange={(e) => setCourse(e.target.value)} >
                                                    <option value="">-- Select --</option>
                                                    {Array.isArray(courses) && courses.length > 0 ? (
                                                        courses.map((course) => (
                                                            <option key={course._id} value={course._id}>
                                                                {course.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option>No course available</option>
                                                    )}
                                                </select>

                                                {errors.course && <small className="text-danger">{errors.course}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Step <span className="text-danger">*</span> </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Level 1, Level 2, Level 3"
                                                    onChange={(e) => setStep(e.target.value)}
                                                    required
                                                />
                                                {errors.step && <small className="text-danger">{errors.step}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Title <span className="text-danger">*</span> </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter title"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    required
                                                />
                                                {errors.title && <small className="text-danger">{errors.title}</small>}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toaster Message */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}
