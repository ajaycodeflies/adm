import React from "react";
import Recommended from './../user/recommended/page';

const NavTop = (props) => {
    return (
        <>
            <aside className="nav-top">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a href="./dashboard">
                        <i className="bi bi-arrow-left"></i>
                    </a>
                    {
                        props.title ? <h6>Recommended for you</h6> : ""
                    }                        
                </nav>
            </aside>
        </>
    );
}

export default NavTop;