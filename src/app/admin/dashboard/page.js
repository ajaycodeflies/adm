"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardCounts, setDashboardCounts] = useState({
    lessons: 0,
    users: 0,
    questions: 0,
    pages: 0,
  });

  useEffect(() => {
    fetch("/api/admin/dashboard/count")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setDashboardCounts({
            lessons: data.lessons,
            users: data.usersCount,
            questions: data.questionsCount,
            pages: data.pagesCount,
          });
        }
      })
      .catch((err) => console.error("Error fetching dashboard counts:", err));
  }, []);
  

  return (
    <AdminLayout>
      <div className="bg-blue-dark pt-10 pb-21"></div>
      <div className="mt-n22 px-6 container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <h3 className="mb-0 text-white">Dashboard</h3>
          </div>
          {[
            { title: "Lessons", count: dashboardCounts.lessons, icon: "bi-book" },
            { title: "Users", count: dashboardCounts.users, icon: "bi-people" },
            { title: "Assessment Questions", count: dashboardCounts.questions, icon: "bi-question-circle" },
            { title: "Pages", count: dashboardCounts.pages, icon: "bi-file-earmark" },
          ].map((item, idx) => (
            <div key={idx} className="mt-6 col-xl-3 col-lg-6 col-md-12 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="mb-0 text-black">{item.title}</h4>
                    </div>
                    <div className="icon-shape icon-md bg-blue-dark text-white rounded-2">
                      <i className={item.icon}></i>
                    </div>
                  </div>
                  <h1 className="fw-bold text-blue-dark">{item.count || 0}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
