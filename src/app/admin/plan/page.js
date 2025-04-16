"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import ShowToast from "../components/ShowToast";
import Link from "next/link";

export default function PlanPage() {
    const router = useRouter();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editPlan, setEditPlan] = useState(null);
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
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchPlans();
        }
    }, [router]);

    // Function to fetch plans from the API
    const fetchPlans = async () => {
        try {
            const response = await fetch("/api/admin/plans");
            if (response.ok) {
                const data = await response.json();
                setPlans(data.plans || []);
            } else {
                throw new Error("Failed to fetch plans.");
            }
        } catch (error) {
            setError("Failed to fetch plans. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle opening the edit modal
    const openEditModal = (plan) => {
        setEditPlan(plan);
        setModalVisible(true);
    };

    // Function to handle saving the edited plan
    const saveEditPlan = async () => {
        try {
            const response = await fetch(`/api/admin/plans/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planId: editPlan._id,
                    planName: editPlan.plan_name,
                    price: parseFloat(editPlan.price),
                    originalPrice: parseFloat(editPlan.original_price),
                    perDayPrice: parseFloat(editPlan.per_day_price),
                    perDayOff: parseFloat(editPlan.per_day_off) || 0,
                    status: parseInt(editPlan.status),
                    isPopular: editPlan.is_popular === true || editPlan.is_popular === "true",
                }),
                timeout: 10000,
            });

            const result = await response.json();

            if (response.ok) {
                const updatedPlan = result?.plan;
                if (updatedPlan) {
                    setPlans((prevPlans) =>
                        prevPlans.map((plan) => (plan._id === updatedPlan._id ? updatedPlan : plan))
                    );
                    setModalVisible(false);
                    showToast("Plan updated successfully", "success");
                } else {
                    const errorMessage = result?.message || "Failed to update the plan. Please try again.";
                    showToast(errorMessage, "error");
                }
            } else {
                console.error("Error updating plan:", result.message);
                showToast(result.message, "error");
            }
        } catch (error) {
            console.error("Error updating plan:", error);
            showToast("Failed to update the plan. Please try again.", "error");
        }
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setModalVisible(false);
        setEditPlan(null);
    };

    // Function to delete a plan
    const deletePlan = async (id) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            try {
                const response = await fetch(`/api/admin/plans?id=${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.message);
                    showToast(result.message, "error");
                    setPlans(plans.filter((plan) => plan._id !== id));
                } else {
                    const error = await response.json();
                    console.error("Error deleting plan:", error.message || "Unknown error");
                    showToast(error.message || "Unknown error", "error");
                }
            } catch (error) {
                console.error("Error deleting plan:", error);
                showToast("Failed to delete the plan. Please try again.", "error");
            }
        }
    };

    if (loading) {
        return <p>Loading plans...</p>;
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
                            <h3 className="mb-0 fw-bold">All Plans</h3>
                            <Link href="/admin/plan/create" className="btn btn-sm btn-blue">
                                <i className="bi bi-plus-lg"></i> Add Plan
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
                                            <th>Offer Price</th>
                                            <th>Original Price</th>
                                            <th>Per Day</th>
                                            <th>Per Day Off</th>
                                            <th>Most Popular</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans.map((plan, index) => (
                                            <tr key={plan._id}>
                                                <td>{index + 1}</td>
                                                <td>{plan.plan_name}</td>
                                                <td>${plan.price}</td>
                                                <td>${plan.original_price}</td>
                                                <td>${plan.per_day_price}</td>
                                                <td>${plan.per_day_off}</td>
                                                <td>
                                                    {plan.is_popular ? (
                                                        <span className="badge badge-primary">Yes</span>
                                                    ) : (
                                                        <span className="badge badge-gray">No</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {plan.status ? (
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
                                                    }).format(new Date(plan.created_at))}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => openEditModal(plan)}
                                                    >
                                                        Edit
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => deletePlan(plan._id)}
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
                                <h5 className="modal-title text-white">Edit Plan</h5>
                                <button
                                    type="button"
                                    className="btn-close text-red"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="mb-3">
                                    <label className="form-label">Plan Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editPlan.plan_name}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, plan_name: e.target.value })
                                        }
                                        placeholder="Enter plan name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Offer Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editPlan.price}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, price: e.target.value })
                                        }
                                        placeholder="Enter offer price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Original Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editPlan.original_price}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, original_price: e.target.value })
                                        }
                                        placeholder="Enter original price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Per Day Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editPlan.per_day_price}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, per_day_price: e.target.value })
                                        }
                                        placeholder="Enter per day price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Per Day Off</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editPlan.per_day_off}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, per_day_off: e.target.value })
                                        }
                                        placeholder="Enter per day off"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Most Popular</label>
                                    <select
                                        className="form-select"
                                        value={editPlan.is_popular}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, is_popular: e.target.value })
                                        }
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        value={String(editPlan.status)}
                                        onChange={(e) =>
                                            setEditPlan({ ...editPlan, status: e.target.value })
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
                                    onClick={saveEditPlan}
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
