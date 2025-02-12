"use client";

import React, { useState } from 'react';

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

import Link from "next/link";

import Image from "next/image";
import Challenges from './../challenges/page';
import Recommended from './../recommended/page';

const ChallengesDetail = () => {


    return (
        <>
            <div className="box-container">
                <NavTop />
                <div className="box-inner-content">


                    <div className="card-challenges-detail">
                        <div className="card-challenges-detail-image">
                            <Image src="/images/courses/15863066.jpg" width={200} height={100} alt="course-preview" />
                        </div>
                        <h6>28-Day AI Challenge</h6>
                        <p>28 days - Beginner</p>
                        <a href="">Join Now</a>
                    </div>

                    <h5 className="my-3 heading-with-btn">Challenges Detail</h5>

                    <div className="challenges-detail-mini">
                        <div className="challenges-detail-item">
                            <p>Duration</p>
                            <h6><i className="bi bi-clock"></i> 28 days</h6>
                        </div>
                        <div className="challenges-detail-item">
                            <p>Level</p>
                            <h6><i className="bi bi-reception-4"></i> Beginner</h6>
                        </div>
                    </div>

                    <h5 className="my-3 heading-with-btn">How does it work?</h5>
                    <p>
                        Each day for 28 days, well introduce you to a brand-new AI tool. These tools covers everything from chatting with AI to creating stunning designs and beyond. Its like unwrapping
                       a new gift every day, filled with exciting possibilities. 
                    </p>

                    
                    <h5 className="my-3 heading-with-btn">Success Stories</h5>

                    <div className='testimonials'>
                        <div className='testimonial-item'>
                            <div className='testimonial-header'>
                                <p>Matthew</p>
                                <span>Verified Customer</span>
                            </div>
                            <div className='testimonial-body'>
                                <p>
                                    Highly recommend for anyone looking to dive into AI in a fun and accessible way!
                                </p>
                            </div>
                            <div className='testimonial-footer'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>

                        <div className='testimonial-item'>
                            <div className='testimonial-header'>
                                <p>Matthew</p>
                                <span>Verified Customer</span>
                            </div>
                            <div className='testimonial-body'>
                                <p>
                                    Highly recommend for anyone looking to dive into AI in a fun and accessible way!
                                </p>
                            </div>
                            <div className='testimonial-footer'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>

                        <div className='testimonial-item'>
                            <div className='testimonial-header'>
                                <p>Matthew</p>
                                <span>Verified Customer</span>
                            </div>
                            <div className='testimonial-body'>
                                <p>
                                    Highly recommend for anyone looking to dive into AI in a fun and accessible way!
                                </p>
                            </div>
                            <div className='testimonial-footer'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>


                        

                    </div>


                    <div className='daily-course'>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/chatgpt.jpg" width={100} height={100} alt='chatgpt' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/dalle.png" width={100} height={100} alt='dalle' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/midjourney.png" width={100} height={100} alt='midjourney' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/runway.png" width={100} height={100} alt='runway' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/jasper.png" width={100} height={100} alt='jasper' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/otter.png" width={100} height={100} alt='otter' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/heygen.png" width={100} height={100} alt='heygen' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/nightcafe.png" width={100} height={100} alt='nightcafe' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/bria.png" width={100} height={100} alt='bria' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/fliki.png" width={100} height={100} alt='fliki' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/openai.png" width={100} height={100} alt='openai' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/copilot.png" width={100} height={100} alt='copilot' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/gemini.png" width={100} height={100} alt='gemini' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/secondnature.png" width={100} height={100} alt='secondnature' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/wordtune.png" width={100} height={100} alt='wordtune' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/grammerly.png" width={100} height={100} alt='grammerly' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/writesonic.png" width={100} height={100} alt='writesonic' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/chatfuel.png" width={100} height={100} alt='chatfuel' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/googleai.png" width={100} height={100} alt='googleai' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/krisp.png" width={100} height={100} alt='krisp' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/vocalai.jpg" width={100} height={100} alt='vocalai' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/conversica.png" width={100} height={100} alt='conversica' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/invideo.png" width={100} height={100} alt='invideo' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/knowjiai.png" width={100} height={100} alt='knowjiai' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/crypko.png" width={100} height={100} alt='crypko' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/soulmachines.png" width={100} height={100} alt='soulmachines' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/crypko.png" width={100} height={100} alt='crypko' />
                        </div>
                        <div className='daily-course-item'>
                            <Image src="/images/tools/soulmachines.png" width={100} height={100} alt='soulmachines' />
                        </div>
                    </div>

                </div>
                <NavBottom />
            </div>
        </>
    )
}

export default ChallengesDetail;