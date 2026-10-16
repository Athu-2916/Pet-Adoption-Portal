import React, {
    useEffect,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import NotificationBell
    from "./NotificationBell";


function Navbar() {

    const navigate = useNavigate();


    const getRole = () => {

        return (
            localStorage.getItem("role") || ""
        )
            .trim()
            .toUpperCase();
    };


    const [role, setRole] = useState(
        getRole()
    );


    const [isLoggedIn, setIsLoggedIn] =
        useState(
            !!localStorage.getItem("token")
        );


    // =====================================================
    // UPDATE LOGIN STATE
    // =====================================================

    useEffect(() => {

        const updateNavbar = () => {

            setRole(
                getRole()
            );

            setIsLoggedIn(
                !!localStorage.getItem(
                    "token"
                )
            );
        };


        window.addEventListener(
            "login",
            updateNavbar
        );


        window.addEventListener(
            "logout",
            updateNavbar
        );


        window.addEventListener(
            "storage",
            updateNavbar
        );


        return () => {

            window.removeEventListener(
                "login",
                updateNavbar
            );

            window.removeEventListener(
                "logout",
                updateNavbar
            );

            window.removeEventListener(
                "storage",
                updateNavbar
            );
        };

    }, []);


    // =====================================================
    // ADMIN CHECK
    // =====================================================

    const isAdmin =
        role === "ADMIN";


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "userId"
        );

        localStorage.removeItem(
            "role"
        );

        localStorage.removeItem(
            "userRole"
        );


        setRole("");

        setIsLoggedIn(false);


        window.dispatchEvent(
            new Event("logout")
        );


        navigate(
            "/",
            {
                replace: true
            }
        );
    };


    // =====================================================
    // NAVBAR
    // =====================================================

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
        >

            <div className="container-fluid px-4">

                {/* BRAND */}

                <Link
                    className="navbar-brand fw-bold"
                    to={
                        isAdmin
                            ? "/admin"
                            : "/"
                    }
                >
                    Pet Adoption Portal
                </Link>


                {/* =================================================
                    LEFT / CENTER MENU
                ================================================= */}

                <div className="navbar-nav">

                    {/* HOME */}

                    <Link
                        className="nav-link"
                        to={
                            isAdmin
                                ? "/admin"
                                : "/"
                        }
                    >
                        Home
                    </Link>


                    {/* PETS */}

                    <Link
                        className="nav-link"
                        to="/category/dog"
                    >
                        Pets
                    </Link>


                    {/* =================================================
                        ADMIN MENU
                    ================================================= */}

                    {isLoggedIn &&
                        isAdmin && (

                            <>

                                <Link
                                    className="nav-link"
                                    to="/admin"
                                >
                                    Dashboard
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/manage-pets"
                                >
                                    Manage Pets
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/manage-vets"
                                >
                                    Manage Vets
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/manage-users"
                                >
                                    Manage Users
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/adoption-requests"
                                >
                                    Requests
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/manage-vet-bookings"
                                >
                                    Vet Appointments
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/manage-messages"
                                >
                                    Manage Contact
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/analytics"
                                >
                                    Analytics
                                </Link>

                            </>

                        )}


                    {/* =================================================
                        USER MENU
                    ================================================= */}

                    {isLoggedIn &&
                        !isAdmin && (

                            <>

                                <Link
                                    className="nav-link"
                                    to="/my-adoptions"
                                >
                                    My Adoptions
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/favorites"
                                >
                                    Favorites
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/vets"
                                >
                                    Veterinarians
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/pet-care"
                                >
                                    Pet Care
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/my-vet-appointments"
                                >
                                    My Vet Appointments
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/about"
                                >
                                    About
                                </Link>


                                <Link
                                    className="nav-link"
                                    to="/contact"
                                >
                                    Contact
                                </Link>

                            </>

                        )}

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div
                    className="d-flex align-items-center"
                >

                    {isLoggedIn && (
                        <NotificationBell />
                    )}


                    {!isLoggedIn ? (

                        <>

                            <Link
                                to="/login"
                                className="btn btn-outline-light me-2"
                            >
                                Login
                            </Link>


                            <Link
                                to="/register"
                                className="btn btn-warning"
                            >
                                Register
                            </Link>

                        </>

                    ) : (

                        <button
                            className="btn btn-danger ms-2"
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </button>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;