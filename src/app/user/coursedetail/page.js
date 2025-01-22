import React from "react";

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";


import Link from "next/link";
import Image from "next/image";
import { bcrypt } from 'bcryptjs';

const CourseDetail = () => { 
    return (
        <>
            <div className="box-container">
                <NavTop title={0} />
                <div className="box-inner-content">


                    <div className="course-preview">
                        <Image src="/images/courses/15863066.jpg" alt="course-preview" width={500} height={200} />
                    </div>
                    <div className="course-detail">
                        <h5>AI Mastery</h5>
                        <p>
                            Step-by-Step program to guide you from beginner to expert in using various AI tools
                        </p>
                        <a href="#">Resume Path</a>
                    </div>
                    {/* Course Modules */}
                    <div className="course-item">
                        <div className="course-item-preview">
                            <Image src="/images/icons/artificial-intelligence.png" alt="course-preview" width={500} height={200} />
                        </div>
                        <div className="course-item-content">
                            <h6>ChatGPT</h6>
                            <p>Lessons 16 - 3 Levels</p>                            
                            <div className="progress"></div>
                        </div>
                    </div>

                    <div className="course-item-separator"></div>

                    <div className="course-item">
                        <div className="course-item-preview">
                            <Image src="/images/icons/ai.png" alt="course-preview" width={500} height={200} />
                        </div>
                        <div className="course-item-content">
                            <h6>MidJourney</h6>
                            <p>Lessons 16 - 3 Levels</p>
                            <div className="progress"></div>
                        </div>
                    </div>

                    <div className="course-item-separator"></div>

                    <div className="course-item">
                        <div className="course-item-preview">
                            <Image src="/images/icons/artificial-intelligence-c1.png" alt="course-preview" width={500} height={200} />
                        </div>
                        <div className="course-item-content">
                            <h6>First Steps to Profit with AI</h6>
                            <p>Lessons 16 - 3 Levels</p>
                            <div className="progress"></div>
                        </div>
                    </div>

                    <div className="course-item-separator"></div>
                    
                    <div className="course-item">
                        <div className="course-item-preview">
                            <Image src="/images/icons/money.png" alt="course-preview" width={500} height={200} />
                        </div>
                        <div className="course-item-content">
                            <h6>Earning Through ChatGPT-4 in SMM</h6>
                            <p>Lessons 16 - 3 Levels</p>
                            <div className="progress"></div>
                        </div>
                    </div>


                    <h5 className="my-3">Certificates</h5>

                    <div className="card-certificate-ingrid">
                        <div className="certificate-item">
                            <div className="certificate-image"></div>
                            <h5>ChatGPT</h5>
                            <span>0%</span>
                        </div>

                        <div className="certificate-item">
                            <div className="certificate-image"></div>
                            <h5>DALL-E</h5>
                            <span>0%</span>
                        </div>

                        <div className="certificate-item">
                            <div className="certificate-image"></div>
                            <h5>MidJourney</h5>
                            <span>0%</span>
                        </div>

                        <div className="certificate-item">
                            <div className="certificate-image"></div>
                            <h5>Jasper AI</h5>
                            <span>0%</span>
                        </div>


                    </div>

                </div>
                <NavBottom />
            </div>
        </>
    );
}

export default CourseDetail;