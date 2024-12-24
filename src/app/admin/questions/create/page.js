"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";

export default function QuestionCreatePage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", value: "", image: null },
    { text: "", value: "", image: null },
  ]);
  const router = useRouter();

  useEffect(() => {
    const sessionToken = Cookies.get("session_token");
    if (!sessionToken) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleImageUpload = (index, file) => {
    const updatedOptions = [...options];
    updatedOptions[index].image = file;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", value: "", image: null }]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some((opt) => !opt.text || !opt.value)) {
      alert("Please fill all fields.");
      return;
    }

    // Construct FormData for image upload
    const formData = new FormData();
    formData.append("question", question);

    options.forEach((option, index) => {
      formData.append(`options[${index}][text]`, option.text);
      formData.append(`options[${index}][value]`, option.value);
      if (option.image) {
        formData.append(`options[${index}][image]`, option.image);
      }
    });

    try {
      const response = await fetch("/api/admin/questions", {
        method: "POST",
        body: formData, // Sending as multipart/form-data
      });

      if (response.ok) {
        alert("Question added successfully!");
        setQuestion("");
        setOptions([{ text: "", value: "", image: null }, { text: "", value: "", image: null }]);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add question.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 container-fluid">
        <div className="align-items-center row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="bg-white rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <h3 className="mb-0 fw-bold">Add Assessment Question</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="row">
            <div className="mb-6 col-xl-9 col-lg-12 col-md-12 col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Enter Question</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the question text"
                      ></textarea>
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
                              onChange={(e) =>
                                handleOptionChange(index, "text", e.target.value)
                              }
                              placeholder={`Option ${index + 1} text`}
                            />
                            <input
                              type="number"
                              className="form-control"
                              value={option.value}
                              onChange={(e) =>
                                handleOptionChange(index, "value", e.target.value)
                              }
                              placeholder={`Option ${index + 1} value`}
                            />
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e.target.files[0])}
                            />
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleRemoveOption(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary mt-3"
                        onClick={handleAddOption}
                      >
                        Add Option
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
