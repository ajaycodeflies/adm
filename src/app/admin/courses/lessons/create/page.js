"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/AdminLayout";
import ShowToast from "../../../components/ShowToast";
import Link from "next/link";
import Cookies from "js-cookie";
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function LessonCreate() {
    const router = useRouter();
    const [course, setCourse] = useState("");
    const [level, setLevel] = useState("");
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
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
            const res = await fetch("/api/admin/courses");
            const data = await res.json();
            setCourses(data.courses || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchLevels = async (courseId) => {
        try {
            const res = await fetch(`/api/admin/courses/levels?courseId=${courseId}`);
            const data = await res.json();

            if (data.success) {
                setLevels(data.levels || []);
            } else {
                console.error(data.message);
                setLevels([]);
            }
        } catch (error) {
            console.error("Error fetching levels:", error);
            setLevels([]);
        }
    };

    const handleCourseChange = (e) => {
        const selectedCourse = e.target.value;
        setCourse(selectedCourse);
        setLevel("");
        if (selectedCourse) {
            fetchLevels(selectedCourse);
        }
        if(selectedCourse == "0") {
            setLevel("");
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!course.trim()) newErrors.course = "Course is required";
        if (!level.trim()) newErrors.level = "Level is required";
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!question.trim()) newErrors.question = "Question is required";
        if (!description.trim()) newErrors.description = "Description is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("course", course);
        formData.append("level", level);
        formData.append("title", title);
        formData.append("question", question);
        formData.append("description", description);

        try {
            const response = await fetch("/api/admin/courses/lessons", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.ok && data.success) {
                setCourse("");
                setLevel("");
                setTitle("");
                setQuestion("");
                setDescription("");
                if (formRef.current) formRef.current.reset();
                showToast(data.message || "Lesson added successfully!", "success");
            } else {
                showToast(data.message || "Failed to add lesson. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error adding lesson:", error);
            showToast("Something went wrong. Please try again.", "error");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="bg-white rounded-bottom smooth-shadow-sm">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <h3 className="mb-0 fw-bold">Add Lesson</h3>
                                <Link href="/admin/courses/lessons" className="btn btn-sm btn-blue">
                                    Lessons List <i className="bi bi-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="card-form">
                                <div className="card-body">
                                    <form ref={formRef} onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <div className="mb-3">
                                                <label className="form-label">Select Course <span className="text-danger">*</span> </label>
                                                <select
                                                    className="form-select"
                                                    value={course}
                                                    onChange={handleCourseChange}
                                                >
                                                    <option value="0"> Select Course</option>
                                                    {courses.map((course) => (
                                                        <option key={course._id} value={course._id}>
                                                            {course.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.course && <small className="text-danger">{errors.course}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Select Level <span className="text-danger">*</span> </label>
                                                <select
                                                    className="form-select"
                                                    value={level}
                                                    onChange={(e) => setLevel(e.target.value)}
                                                >
                                                    <option value="0">-- select --</option>
                                                    {levels.map((level) => (
                                                        <option key={level._id} value={level._id}>
                                                            {level.step} - {level.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.level && <small className="text-danger">{errors.level}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Title <span className="text-danger">*</span> </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    required
                                                />
                                                {errors.title && <small className="text-danger">{errors.title}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Question <span className="text-danger">*</span> </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter question"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                    required
                                                />
                                                {errors.question && <small className="text-danger">{errors.question}</small>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Description <span className="text-danger">*</span> </label>
                                                <Editor
                                                    wrapperClassName="wrapper"
                                                    editorClassName="editor"
                                                    toolbarClassName="toolbar"
                                                    onEditorStateChange={(editorState) => setDescription(editorState.getCurrentContent().getPlainText())}
                                                />
                                                {errors.description && <small className="text-danger">{errors.description}</small>}
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
            {/* Toaster Message Component */}
            <ShowToast message={toastMessage} type={toastType} />
        </AdminLayout>
    );
}
