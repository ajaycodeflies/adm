"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import { set } from "mongoose";

export default function QuestionCreatePage() {
  const [labels, setLabels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionLabel, setQuestionLabel] = useState("");
  const [options, setOptions] = useState([{ text: "", value: "" }, { text: "", value: "" }]);
  const [newLabel, setNewLabel] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (!Cookies.get("session_token")) router.push("/admin/login");
    else fetchLabels();
  }, [router]);

  const fetchLabels = async () => {
    try {
      const res = await fetch("/api/admin/labels");
      const data = await res.json();
      if (data.labels) {
        setLabels(data.labels);
      } else {
        setLabels([]);
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  const handleAddLabel = async () => {
    if (!newLabel) return alert("Label cannot be empty.");
    try {
      const res = await fetch("/api/admin/labels", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel })
      });
      if (res.ok) {
        const data = await res.json();
        setLabels([...labels, ...data.labels]);
        setNewLabel(""); setModalVisible(false);
        setToastMessage("Label added successfully");
        setToastType("success");
      } else {
        throw new Error("Failed to add label.");
      }
    } catch (error) {
      setModalVisible(false);
      setToastMessage("Failed to add label. Please try again.");
      setToastType("error");
      console.error("Error adding label:", error);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("label", questionLabel);
    formData.append("question", question);
    options.forEach((option, index) => {
      formData.append(`options[${index}][text]`, option.text);
      formData.append(`options[${index}][value]`, option.value);
    });
    if (image) {
      formData.append("image", image);
    }

    // console.log("Form Data:", Array.from(formData.entries()));
    fetch("/api/admin/questions", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setQuestion("");
          setQuestionLabel("");
          setOptions([{ text: "", value: "" }, { text: "", value: "" }]);
          setImage(null);
          setToastMessage("Question added successfully");
          setToastType("success");
        } else {
          console.error("Failed to add question:", data.error);
          setToastMessage(data.error || "Failed to add question");
          setToastType("error");
        }
      })
      .catch((error) => {
        console.error("Error adding question:", error);
        setToastMessage("Failed to add question. Please try again.");
        setToastType("error");
      });
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", value: "" }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="d-flex justify-content-between pt-4 pb-6">
          <h3 className="fw-bold">Add Assessment Question</h3>
          <div>
            <button className="btn btn-success btn-sm" onClick={() => setModalVisible(true)}>
              <i className="bi bi-plus"></i> Add Label
            </button>
            <Link href="/admin/questions" className="btn btn-blue btn-sm ml-3">
              View Questions <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-9">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Label</label>
                <select
                  className="form-select"
                  value={questionLabel}
                  onChange={(e) => setQuestionLabel(e.target.value)}
                >
                  <option value="">Select Label</option>
                  {labels.length > 0 ? (
                    labels.map((label) => (
                      <option key={label._id} value={label._id}>
                        {label.label}
                      </option>
                    ))
                  ) : (
                    <option>No labels available</option>
                  )}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter question"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Options</label>
                {options.map((option, index) => (
                  <div key={index} className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">{index + 1}</span>
                      <input
                        type="text"
                        className="form-control"
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                        placeholder={`Option ${index + 1} text`}
                      />
                      <input
                        type="number"
                        className="form-control"
                        value={option.value}
                        onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                        placeholder={`Option ${index + 1} value`}
                      />
                      {/* Show the "Remove" button only after the first two options */}
                      {index >= 2 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mt-3"
                  onClick={handleAddOption}
                >
                  Add Option
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>

        {modalVisible && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Label</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalVisible(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Enter new label"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalVisible(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddLabel}
                  >
                    Add Label
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Toaster Message */}
      {toastMessage && (
        <div className={`toast-message ${toastType}`}>
          <p>{toastMessage}</p>
        </div>
      )}
    </AdminLayout>
  );
}
