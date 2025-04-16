"use client";

import React, { useEffect, useState } from "react";

const ShowToast = ({ message, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000); // auto-hide after 3s
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible) return null;

    return (
        <div className={`toast-message ${type}`}>
            <p>{message}</p>
        </div>
    );
};

export default ShowToast;
