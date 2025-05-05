"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import ShowToast from "../../components/ShowToast";
import Link from "next/link";

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

  const showToast = (message, type = "error") => {
    setToastMessage("");
    setToastType(type);
    setTimeout(() => {
      setToastMessage(message);
    }, 10);
  };

  useEffect(() => {fetchLabels()});

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
    if (!newLabel) return showToast("Please enter a label", "error");
    try {
      const res = await fetch("/api/admin/labels", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel })
      });
      if (res.ok) {
        const data = await res.json();
        setLabels([...labels, ...data.labels]);
        setNewLabel(""); setModalVisible(false);
        showToast("Label added successfully", "success");
      } else {
        const error = await res.json();
        console.error("Error adding label:", error);
        showToast(error.error, "error");
      }
    } catch (error) {
      setModalVisible(false);
      showToast("Failed to add label. Please try again.", "error");
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
          showToast("Question added successfully", "success");
        } else {
          console.error("Failed to add question:", data.message);
          const errorMessage = data.message || "Failed to add question. Please try again.";
          showToast(errorMessage, "error")
        }
      })
      .catch((error) => {
        console.error("Error adding question:", error);
        showToast("Something went wrong while add question.", "error");
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
      <div className="p-6 container-fluid">
        <div className="align-items-center row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="bg-white rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <h3 className="mb-0 fw-bold">Add Assessment Question</h3>
                <div>
                  <button className="btn btn-success btn-sm" onClick={() => setModalVisible(true)}>
                    <i className="bi bi-plus"></i> Add Label
                  </button>
                  <Link href="/admin/questions" className="btn btn-blue btn-sm ml-3">
                    <i className="bi bi-list"></i> View Questions 
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="row">
            <div className="mb-6 col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="card-form">
                <div className="card-body">
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
              </div>
            </div>
          </div>
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
      {/* Toast message component */}
      <ShowToast message={toastMessage} type={toastType} />
    </AdminLayout>
  );
}
