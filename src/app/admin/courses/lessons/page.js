
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import { EditorState, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false } // This is the crucial part
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function Lessons() {
    const router = useRouter();
    const [course, setCourse] = useState("");
    const [level, setLevel] = useState("");
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [editLesson, setEditLesson] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchLessons();
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

    const handleCourseChange = async (e) => {
        const selectedCourse = e.target.value;
        setCourse(selectedCourse);
        setLevel("");

        if (selectedCourse) {
            try {
                const res = await fetch(`/api/admin/courses/levels?courseId=${selectedCourse}`);
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
        }

        if (selectedCourse === "0") {
            setLevel("");
        }
    };

    const fetchLessons = async () => {
        try {
            const response = await fetch("/api/admin/courses/lessons");
            if (response.ok) {
                const data = await response.json();
                console.log(data.lessons);
                setLessons(data.lessons || []);
            } else {
                throw new Error("Failed to fetch lessons.");
            }
        } catch (error) {
            console.error("Error fetching lessons:", error);
            setError("Failed to fetch lessons. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (lesson) => {
        setEditLesson(lesson);
        setModalVisible(true);
        setCourse(lesson.course_id);
        fetchLevels(lesson.course_id);
        setLevel(lesson.level_id);
        setEditorState(EditorState.createWithContent(ContentState.createFromText(lesson.description)));
    };

    const saveEditLesson = async () => {
        try {
            const formData = new FormData();

            formData.append("lessonId", editLesson._id);
            formData.append("courseId", editLesson.course_id);
            formData.append("levelId", editLesson.level_id);
            formData.append("title", editLesson.title);
            formData.append("question", editLesson.question);
            formData.append("status", editLesson.status);
            formData.append("description", editorState.getCurrentContent().getPlainText());

            const response = await fetch(`/api/admin/courses/lessons`, {
                method: "PUT",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedLesson = result?.lesson;

                if (updatedLesson) {
                    setLessons((prevLessons) =>
                        prevLessons.map((lesson) =>
                            lesson._id === updatedLesson._id ? updatedLesson : lesson
                        )
                    );
                    setToastMessage("Lesson updated successfully!");
                    setToastType("success");
                    setModalVisible(false);
                } else {
                    throw new Error("No lesson data returned");
                }
            } else {
                throw new Error(result.message || "Error updating lesson");
            }
        } catch (err) {
            setToastMessage(err.message || "Something went wrong!");
            setToastType("error");
        }
    };


    const closeModal = () => {
        setModalVisible(false);
        setEditLesson(null);
    };

    useEffect(() => {
        if (modalVisible && editLesson.description) {
            const contentState = ContentState.createFromText(editLesson.description);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [modalVisible, editLesson]);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const deleteLesson = async (id) => {
        if (typeof window !== 'undefined') {
            if (window.confirm("Are you sure...?")) { 
                try {
                    const response = await fetch(`/api/admin/courses/lessons?id=${id}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setLessons(lessons.filter((lesson) => lesson._id !== id));
                        setToastMessage("Lesson deleted successfully!");
                        setToastType("success");
                    } else {
                        const error = await response.json();
                        setToastMessage("Failed to delete . Please try again.");
                        setToastType("error");
                    }
                } catch (error) {
                    setToastMessage("Failed to delete . Please try again.");
                    setToastType("error");
                }
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
                            <h3 className="mb-0 fw-bold">All Lessons</h3>
                            <Link href="/admin/courses/lessons/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Add Lesson
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
                                            <th>Lavel</th>
                                            <th>Question</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lessons.map((lesson, index) => (
                                            <tr key={lesson._id}>
                                                <td>{index + 1}</td>
                                                <td>{lesson.course_details.name}</td>
                                                <td>{lesson.level_details.step}</td>
                                                <td>{lesson.question}</td>
                                                <td>{lesson.title}</td>
                                                <td>
                                                    {lesson.status === "1" ? (
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
                                                    }).format(new Date(lesson.created_at))}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => openEditModal(lesson)}
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deleteLesson(lesson._id)}
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
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '1200px' }}>
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
                                    <label className="form-label">Select Course <span className="text-danger">*</span> </label>
                                    <select
                                        className="form-select"
                                        value={editLesson.course_id || ''}
                                        onChange={(e) =>
                                            setEditLesson({ ...editLesson, course_id: e.target.value })
                                        }
                                        onBlur={(e) => {
                                            const selectedCourse = e.target.value;
                                            setEditLesson({ ...editLesson, course_id: selectedCourse });
                                            if (selectedCourse) {
                                                fetchLevels(selectedCourse);
                                            }
                                        }}
                                    >
                                        <option value="">Select Course</option>
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
                                        value={editLesson.level_id || ''}
                                        onChange={(e) =>
                                            setEditLesson({ ...editLesson, level_id: e.target.value })
                                        }
                                    >
                                        <option value="">-- select --</option>
                                        {levels.map((level) => (
                                            <option key={level._id} value={level._id}>
                                                {level.step} - {level.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.level && <small className="text-danger">{errors.level}</small>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLesson.title}
                                        onChange={(e) =>
                                            setEditLesson({ ...editLesson, title: e.target.value })
                                        }
                                        placeholder="Enter title"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Question</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLesson.question}
                                        onChange={(e) =>
                                            setEditLesson({ ...editLesson, question: e.target.value })
                                        }
                                        placeholder="Enter question"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={editLesson.status}
                                        onChange={(e) =>
                                            setEditLesson({ ...editLesson, status: e.target.value })
                                        }
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description <span className="text-danger">*</span> </label>
                                    <Editor
                                        wrapperClassName="wrapper"
                                        editorClassName="editor"
                                        toolbarClassName="toolbar"
                                        editorState={editorState} // Use the editor state
                                        onEditorStateChange={(state) => {
                                            setEditorState(state); // Update editor state
                                            setEditLesson({
                                                ...editLesson,
                                                description: state.getCurrentContent().getPlainText(),
                                            });
                                        }}
                                    />
                                    {errors.description && <small className="text-danger">{errors.description}</small>}
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
                                    onClick={saveEditLesson}
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

