"use client";

import React, { useState } from 'react';

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

import Image from "next/image";

const Challenges = () => {

    const [activeTab, setActiveTab] = useState('all');

    const handleTabClick = (e, target) => {
        e.preventDefault();
        setActiveTab(target);
    };


    return (
        <>
            <div className="box-container">
                <NavTop />
                <div className="box-inner-content">

                    <ul className="nav-tablist">
                        <li>
                            <a href="#"
                                role="nav-tablist"
                                target="all"
                                onClick={(e) => handleTabClick(e, 'all')}
                                className={activeTab === 'all' ? 'active' : ''}>All</a>
                        </li>
                        <li>
                            <a href="#"
                                role="nav-tablist"
                                target="completed"
                                onClick={(e) => handleTabClick(e, 'completed')}
                                className={activeTab === 'completed' ? 'active' : ''}>Completed</a>
                        </li>
                    </ul>

                    <div className="nav-tabcontent">
                        <div className={`nav-tabpane ${activeTab === 'all' ? 'active' : ''}`}
                            id="all">
                            <div className="card-challenges">
                                <div className="card-challenges-image">
                                    <Image src="/images/courses/15863066.jpg" width={200} height={100} alt="course-preview" />
                                </div>
                                <h6>28-Day AI Challenge</h6>
                                <p>28 days - Beginner</p>
                            </div>
                        </div>
                        <div className={`nav-tabpane ${activeTab === 'completed' ? 'active' : ''}`}
                            id="completed">
                            <div className="card-challenges">
                                <div className="card-challenges-image">
                                    <Image src="/images/courses/15863066.jpg" width={200} height={100} alt="course-preview" />
                                </div>
                                <h6>28-Day AI Challenge</h6>
                                <p>28 days - Beginner</p>
                            </div>
                        </div>
                    </div>

                </div>
                <NavBottom />
            </div>
        </>
    )
}

export default Challenges;