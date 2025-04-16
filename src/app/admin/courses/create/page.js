"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";
import ShowToast from "../../components/ShowToast";
import Link from "next/link";

export default function CourseCreate() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [courseName, setCourseName] = useState("");
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!courseName.trim()) {
      newErrors.courseName = "Course name is required.";
    }

    if (!image) {
      newErrors.image = "Image is required.";
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

    formData.append("title", title);
    formData.append("name", courseName);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTitle("");
        setCourseName("");
        setImage(null);
        if (formRef.current) {
          formRef.current.reset();
        }
        showToast(data.message, "success");
      } else {
        const errorMessage = data.message || "Failed to add course. Please try again.";
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      showToast("Failed to add course. Please try again.", "error");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 container-fluid">
        <div className="align-items-center row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="bg-white rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <h3 className="mb-0 fw-bold">Add Course</h3>
                <Link href="/admin/courses" className="btn btn-sm btn-blue">
                  Course List <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="row">
            <div className="mb-6 col-xl-7 col-lg-12 col-md-12 col-12">
              <div className="card-form">
                <div className="card-body">
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="mb-3">
                        <label className="form-label">Image <span className="text-danger">*</span></label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          required
                        />
                        {errors.image && <small className="text-danger">{errors.image}</small>}
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
                      <div className="mb-3">
                        <label className="form-label">Course Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter course name"
                          onChange={(e) => setCourseName(e.target.value)}
                          required
                        />
                        {errors.courseName && <small className="text-danger">{errors.courseName}</small>}
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Course
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Toast message component */}
      <ShowToast message={toastMessage} type={toastType} />
    </AdminLayout>
  );
}
