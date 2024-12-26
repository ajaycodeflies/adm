"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";

export default function PlanCreate() {
  const router = useRouter();

  const [plan, setPlan] = useState({
    planName: "",
    price: "",
    originalPrice: "",
    perDayPrice: "",
    perDayOff:"",
    status: "1", // Default value set to 'Active'
    isPopular: false, // Default value for the checkbox
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan), // Send the plan state directly
      });
      if (response.ok) {
        alert("Plans saved successfully!");
        router.push("/admin/plan");
      } else {
        alert("Failed to save plans!");
      }
    } catch (error) {
      console.error("Error saving plans:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const sessionToken = Cookies.get("session_token");
    if (!sessionToken) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <AdminLayout>
      <div className="p-6 container-fluid">
        <div className="align-items-center row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="bg-white rounded-bottom smooth-shadow-sm">
              <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                <h3 className="mb-0 fw-bold">Add Plan</h3>
                <Link href="/admin/plan" className="btn btn-sm btn-blue">
                  <i className="bi bi-arrow-left"></i> View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6">
          <div className="row">
            <div className="mb-6 col-xl-7 col-lg-12 col-md-12 col-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="mb-3">
                        <label className="form-label">Plan Name</label>
                        <input
                          type="text"
                          name="planName"
                          className="form-control"
                          placeholder="Enter Plan Name"
                          value={plan.planName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Offer Price</label>
                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          placeholder="0.00"
                          value={plan.price}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Original Price</label>
                        <input
                          type="number"
                          name="originalPrice"
                          className="form-control"
                          placeholder="0.00"
                          value={plan.originalPrice}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Per Day Price</label>
                        <input
                          type="number"
                          name="perDayPrice"
                          className="form-control"
                          placeholder="0.00"
                          value={plan.perDayPrice}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Per Day Off</label>
                        <input
                          type="number"
                          name="perDayOff"
                          className="form-control"
                          placeholder="0.00"
                          value={plan.perDayOff}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                          name="status"
                          className="form-select"
                          value={plan.status}
                          onChange={handleChange}
                        >
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </select>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          name="isPopular"
                          className="form-check-input"
                          checked={plan.isPopular}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Most Popular</label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Plans
                    </button>
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
