import React from "react";

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";


import Link from "next/link";
import Image from "next/image";

const Recommended = () => { 
    return (
        <>
            
            <div className="box-container">
                <NavTop />
                <div className="box-inner-content">


                    <div className="card-course-ingrid">
                        <div className="card-course">

                            <Image src="/images/icons/artificial-intelligence.png" alt="course-preview" width={200} height={100} />


                            <p>ChatGPT</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                        <div className="card-course">

                            <Image src="/images/icons/ai.png" alt="course-preview" width={200} height={100} />

                            <p>MidJourney</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                    </div>

                    <div className="card-course-ingrid">
                        <div className="card-course">

                            <Image src="/images/icons/artificial-intelligence-c1.png" alt="course-preview" width={200} height={100} />


                            <p>First Steps to Profit with AI</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                        <div className="card-course">

                            <Image src="/images/icons/money.png" alt="course-preview" width={200} height={100} />

                            <p>Earning Through ChatGPT-4 in SMM</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                    </div>

                    <div className="card-course-ingrid">
                        <div className="card-course">

                            <Image src="/images/icons/artificial-intelligence.png" alt="course-preview" width={200} height={100} />


                            <p>ChatGPT</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                        <div className="card-course">

                            <Image src="/images/icons/ai.png" alt="course-preview" width={200} height={100} />

                            <p>MidJourney</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                    </div>

                    <div className="card-course-ingrid">
                        <div className="card-course">

                            <Image src="/images/icons/artificial-intelligence-c1.png" alt="course-preview" width={200} height={100} />


                            <p>First Steps to Profit with AI</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                        <div className="card-course">

                            <Image src="/images/icons/money.png" alt="course-preview" width={200} height={100} />

                            <p>Earning Through ChatGPT-4 in SMM</p>
                            <h6>Lessons 16 - 3 Levels</h6>
                            <div className="progress"></div>

                        </div>
                    </div>

                </div>
                <NavBottom />
            </div>
        </>
    )
}

export default Recommended;