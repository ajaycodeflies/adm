import React from "react";
import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";
import Image from "next/image";

const AiTools = () => { 
    return (
        <>
            <div className="box-container">
                <NavTop />
                <div className="box-inner-content">
                    <h5 className="my-3 heading-with-btn">Get Help With Any Task</h5>
                    <div className="task-grid">
                        <div className="card-task">
                            <Image src="/images/ai-tools/001.jpg" width={200} height={100} alt="AI Assistant" />
                            <div className="card-task-content">
                                <h5>AI Assistant</h5>
                                <p>Your personal AI-powered helper</p>
                            </div>
                        </div>
                        <div className="card-task">
                            <Image src="/images/ai-tools/002.jpg" width={200} height={100} alt="AI Assistant" />
                            <div className="card-task-content">
                                <h5>ChatGPT Classic</h5>
                                <p>The latest version of GPT-4 with...</p>
                            </div>
                        </div>
                        <div className="card-task">
                            <Image src="/images/ai-tools/001.jpg" width={200} height={100} alt="AI Assistant" />
                            <div className="card-task-content">
                                <h5>AI Assistant</h5>
                                <p>Your personal AI-powered helper</p>
                            </div>
                        </div>
                        <div className="card-task">
                            <Image src="/images/ai-tools/002.jpg" width={200} height={100} alt="AI Assistant" />
                            <div className="card-task-content">
                                <h5>ChatGPT Classic</h5>
                                <p>The latest version of GPT-4 with...</p>
                            </div>
                        </div>
                    </div>
                    <h5 className="my-3 heading-with-btn">
                        Explore other tools
                        <a href="#" className="heading-btn">View All</a>
                    </h5>
                    <div className="tools-capsule-grid">
                        <a href="#" className="tools-capsule active">
                            <i className="bi bi-hand-index"></i> For You
                        </a>
                        <a href="#" className="tools-capsule">
                            <i className="bi bi-star"></i> Productivity
                        </a>
                        <a href="#" className="tools-capsule">
                            <i className="bi bi-search"></i> Lifestyle
                        </a>
                        <a href="#" className="tools-capsule">
                            <i className="bi bi-lightning"></i> Ideas
                        </a>
                    </div>
                    <div className="tools-card-grid">
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/diamond.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>BrainstormBuddy</h5>
                                <p>
                                    BrainstormBuddy acts as a facilitator in brainstorming...
                                </p>
                            </div>
                        </div>
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/creativity.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>Creative Copy</h5>
                                <p>
                                    Creative Copy provides innovative copywriting solutions for brandin...
                                </p>
                            </div>
                        </div>
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/writing.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>Translate</h5>
                                <p>
                                    Instantly translate text into multiple languages
                                </p>
                            </div>
                        </div>
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/pencil.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>Grammer and Style Checker</h5>
                                <p>
                                    Improve grammar and writing style
                                </p>
                            </div>
                        </div>
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/star.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>Productivity Pro</h5>
                                <p>
                                    Maximize your efficiency with powerful tools that help you...
                                </p>
                            </div>
                        </div>
                        <div className="tools-card">
                            <div className="tools-card-header">
                                <Image src="/images/ai-tools-vector/hospital.png" width={200} height={200} alt="AI Assistant" />
                                <a href="#">
                                    <i className="bi bi-arrow-right-short"></i>
                                </a>
                            </div>
                            <div className="tools-card-body">
                                <h5>Health Helper</h5>
                                <p>
                                    Get tips and guidance for a healthier lifestyle
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <NavBottom />
            </div>
        </>
    )
}

export default AiTools;