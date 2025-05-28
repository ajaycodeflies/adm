"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import Header from "../components/Header";
import "../globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

function Pathway() {
    const router = useRouter();

    const chartData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Readiness Level",
                data: [0, 2, 2.5, 4],
                borderColor: "rgba(108, 99, 255, 1)",
                backgroundColor: "rgba(108, 99, 255, 0.2)",
                tension: 0.5,
                pointBackgroundColor: ["red", "orange", "yellow", "green"],
                pointBorderWidth: 2,
                pointRadius: 6,
                fill: true,
                
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                displayColors: false,
                CaretPosition: "top",
                display: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "#eee",
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
                beginAtZero: true,
                max: 4,
            },
        },
    };

    const handleQuizClick = (action) => {
        if (action === "continue") {
            router.push("/selling-page");
        }
    };

    return (
        <div className="box-container">
            <div className="d-flex flex-column">
                <Header />
                <section className="pathway-contain">
                    <div className="readiness-chart">
                        <div className="chart-title">Your readiness level</div>
                        <div className="chart-container">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                        <p className="chart-note">This chart is for illustrative purposes only</p>
                    </div>
                    <div className="button-continue">
                        <div className="cta-text mb-4">
                            <h3 className="fw-bold">Your 4-week AI-Driven Income Growth Challenge is ready!</h3>
                        </div>
                        {/* <button
                            type="button"
                            onClick={() => handleQuizClick("continue")}
                            className="head-btn-alt btn-alt mb-2 text-uppercase" style={{ fontSize : "16px"}}>
                            Continue 
                        </button> */}
                        <Link href="https://adm-digital.learnworlds.com/course/making-the-most-out-of-chatgpt" className="btn btn-blue main-btn-con">
                            Continue
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Pathway;
