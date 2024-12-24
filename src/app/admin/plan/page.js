"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function PlanPage() {
    const router = useRouter();
    const [plans, setPlans] = useState([]); // State to store plans
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(""); // State for errors

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            // Fetch plans from the API
            fetchPlans();
        }
    }, [router]);

    // Function to fetch plans from the API
    // Function to fetch plans from the API
    const fetchPlans = async () => {
        try {
            const response = await fetch("/api/admin/plans");
            if (response.ok) {
                const data = await response.json();
                setPlans(data.plans?.plans || []); // Set the plans if they exist
            } else {
                throw new Error("Failed to fetch plans.");
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
            setError("Failed to fetch plans. Please try again.");
        } finally {
            setLoading(false);
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
                                <i className="bi bi-plus-lg"></i> Edit Plan
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="my-6 row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="h-100 card">
                            <div className="table-responsive">
                                <table className="text-nowrap table">
                                    <thead className="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            {/* <th>Type</th> */}
                                            <th>Price</th>
                                            <th>Original Price</th>
                                            <th>Per Day Price</th>
                                            <th>Most Popular</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plans.map((plan, index) => (
                                            <tr key={plan._id}>
                                                <td>{index + 1}</td>
                                                <td>{plan.name}</td>
                                                {/* <td>{plan.type}</td> */}
                                                <td>{plan.price}</td>
                                                <td>{plan.originalPrice}</td>
                                                <td>{plan.perDay}</td>
                                                <td>{plan.mostPopular ? "Yes" : "No"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
