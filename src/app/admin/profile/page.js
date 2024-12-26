"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminLayout from "../components/AdminLayout";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        profile: "",
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        const sessionToken = Cookies.get("session_token");
        if (!sessionToken) {
            router.push("/admin/login");
        } else {
            fetchProfile();
        }
    }, [router]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/admin/profile", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setProfile({
                    firstName: data.data.first_name || "Admin",
                    lastName: data.data.last_name || "",
                    email: data.data.email || "admin@gmail.com",
                    mobile: data.data.mobile || "",
                    profile: data.data.profile || "/images/admin/profile.jpg",
                });
            } else {
                console.error("Failed to fetch profile:", data.message);
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append("first_name", e.target.first_name.value);
        formData.append("last_name", e.target.last_name.value);
        formData.append("email", e.target.email.value);
        formData.append("mobile", e.target.mobile.value);
    
        // Append the profile picture if provided
        if (file) {
            formData.append("profile", file);
        }
    
        // Only add password if entered
        const password = e.target.password.value;
        if (password) {
            formData.append("password", password);
        }

        try {
            const response = await fetch("/api/admin/profile", {
                method: "PUT",
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.success) {
                console.log("Profile updated successfully!" + data);
                alert("Profile updated successfully!");
                
                // Update the profile state with the new information
                setProfile({
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    email: e.target.email.value,
                    mobile: e.target.mobile.value,
                    profile: data.newProfileImage || profile.profile,  // Assuming the server returns the new image URL
                });
            } else {
                alert("Failed to update profile: " + data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile.");
        }
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="border-bottom pb-4 mb-4 ">
                            <h3 className="mb-0 fw-bold">Profile</h3>
                        </div>
                    </div>
                </div>
                <div className="align-items-center row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        <div className="pt-20 rounded-top" style={{ backgroundImage: "url(/images/admin/profile-cover.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center" }}></div>
                        <div className="bg-white rounded-bottom smooth-shadow-sm ">
                            <div className="d-flex align-items-center justify-content-between pt-4 pb-6 px-4">
                                <div className="d-flex align-items-center">
                                    <div className="avatar-xxl avatar-indicators avatar-online me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                                        <Image src={profile.profile || "/images/admin/profile.jpg"} alt="admin" className="avatar-xxl rounded-circle border border-4 border-white-color-40" width={100} height={100} />
                                    </div>
                                    <div className="lh-1">
                                        <h2 className="mb-0">Admin</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6">
                    <div className="row">
                        <div className="mb-6 col-xl-6 col-lg-12 col-md-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="mb-3 row">
                                            <label htmlFor="profile" className="col-sm-4 col-form-label">Profile</label>
                                            <div className="col-md-8">
                                                <Image
                                                    src={profile.profile || "/images/admin/profile.jpg"}
                                                    alt="Profile"
                                                    className="rounded-circle avatar avatar-lg me-3"
                                                    width={100}
                                                    height={100}
                                                />
                                                <input type="file" className="form-control" id="profile" name="profile" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="firstName" className="col-sm-4 col-form-label">Full Name</label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    name="firstName"
                                                    defaultValue={profile.firstName}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                    defaultValue={profile.lastName}
                                                    
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                                            <div className="col-md-8">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    defaultValue={profile.email}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <label htmlFor="mobile" className="col-sm-4 col-form-label">Mobile</label>
                                            <div className="col-md-8">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="mobile"
                                                    name="mobile"
                                                    defaultValue={profile.mobile}
                                                />
                                            </div>
                                        </div>
                                        <div className="align-items-center row">
                                            <label className="col-sm-4 form-label" htmlFor="password">Password</label>
                                            <div className="col-md-8 col-12">
                                                <input type="password" id="password" className="form-control" />
                                                <span className="small text-danger">Enter password if you want change</span>
                                            </div>
                                            <div className="mt-4 col-md-8 col-12 offset-md-4">
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                            </div>
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
