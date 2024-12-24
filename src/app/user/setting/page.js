import React from "react";

import NavTop from "@/app/components/NavTop";
import NavBottom from "@/app/components/NavBottom";

const Setting = () => {
    return (
        <>
            <div className="box-container">
                <NavTop />
                <div className="box-inner-content">

                    <div className="navigation-group -badge">
                        <a href="#">
                            <span>
                                <i class="bi bi-flag"></i>
                                Terms and Conditions
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <i class="bi bi-lock"></i>
                                Privacy Policy
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <i class="bi bi-file-earmark-text"></i>
                                Subscription Terms
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <i class="bi bi-mailbox-flag"></i>
                                Subscription
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <i class="bi bi-clock-history"></i>
                                Payment History
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                        <a href="#">
                            <span>
                                <i class="bi bi-globe2"></i>
                                Language
                            </span>
                            <span>
                                <i class="bi bi-patch-check-fill"></i>
                                0%
                            </span>
                        </a>
                    </div>

                </div>
                <NavBottom />
            </div>
        </>
    )
}

export default Setting;