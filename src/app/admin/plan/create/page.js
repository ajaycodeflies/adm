"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";

export default function PlanCreate() {
  const router = useRouter();

  const [plans, setPlans] = useState([
    { name: "1-Week Plan", price: 6.93, originalPrice: 13.86, perDay: 0.99 },
    { name: "4-Week Plan", price: 19.99, originalPrice: 39.99, perDay: 0.71, mostPopular: true },
    { name: "12-Week Plan", price: 39.99, originalPrice: 79.99, perDay: 0.48 },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = value;
    setPlans(updatedPlans);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plans }),
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
                <h3 className="mb-0 fw-bold">Add or Edit Plans</h3>
                <Link href="/admin/plans" className="btn btn-sm btn-blue">
                  <i className="bi bi-arrow-left"></i> View Plans
                </Link>
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
                    {plans.map((plan, index) => (
                      <div key={index} className="mb-4">
                        <h5>Plan {index + 1}</h5>
                        <div className="mb-3">
                          <label className="form-label">Plan Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={plan.name}
                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={plan.price}
                            onChange={(e) => handleInputChange(index, "price", e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Original Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={plan.originalPrice}
                            onChange={(e) => handleInputChange(index, "originalPrice", e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Per Day Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={plan.perDay}
                            onChange={(e) => handleInputChange(index, "perDay", e.target.value)}
                          />
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={plan.mostPopular || false}
                            onChange={(e) =>
                              handleInputChange(index, "mostPopular", e.target.checked)
                            }
                          />
                          <label className="form-check-label">Most Popular</label>
                        </div>
                      </div>
                    ))}
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
