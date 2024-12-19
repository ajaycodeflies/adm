import React from "react";


const NavBottom = () => { 
    return (
        <>
            <aside className="nav-bottom">
                <nav class="navbar navbar-expand-lg navbar-light">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                <i class="bi bi-cast"></i>
                                Guides
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-bullseye"></i>
                                Challenges
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-stars"></i>
                                AI Tools
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-person"></i>
                                Profile
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default NavBottom;