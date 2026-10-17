import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate
} from "react-router-dom";

import BackButton
    from "../components/BackButton";


function AdminDashboard() {

    const navigate =
        useNavigate();


    const [pets, setPets] =
        useState([]);

    const [users, setUsers] =
        useState([]);


    // =========================
    // LOAD DASHBOARD DATA
    // =========================

    useEffect(() => {

        fetchDashboardData();

    }, []);


    const fetchDashboardData =
        async () => {

            try {

                const petsResponse =
                    await axios.get(
                        "https://pet-adoption-portal-production.up.railway.app/pets"
                    );

                setPets(
                    petsResponse.data
                );


                const usersResponse =
                    await axios.get(
                        "https://pet-adoption-portal-production.up.railway.app/users"
                    );

                setUsers(
                    usersResponse.data
                );


            } catch (error) {

                console.log(
                    "Dashboard error:",
                    error
                );

            }

        };


    // =========================
    // AVAILABLE PETS
    // =========================

    const availablePets =
        pets.filter(
            (pet) =>
                pet.status?.toUpperCase() ===
                "AVAILABLE"
        ).length;


    return (

        <div className="d-flex">


            {/* =========================
                SIDEBAR
            ========================= */}

            <div
                className="bg-dark text-white p-4"
                style={{
                    width: "260px",
                    minHeight: "100vh"
                }}
            >

                <BackButton
                    destination="/"
                />


                <h2 className="mb-5 mt-3">
                    Admin Panel
                </h2>


                <ul className="list-unstyled">


                    {/* DASHBOARD */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/admin"
                                )
                            }
                        >
                            Dashboard
                        </button>

                    </li>


                    {/* MANAGE PETS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/manage-pets"
                                )
                            }
                        >
                            🐾 Manage Pets
                        </button>

                    </li>


                    {/* MANAGE VETS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/manage-vets"
                                )
                            }
                        >
                            🩺 Manage Vets
                        </button>

                    </li>


                    {/* VET APPOINTMENTS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/admin-vet-appointments"
                                )
                            }
                        >
                            📅 Vet Appointments
                        </button>

                    </li>


                    {/* MANAGE USERS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/manage-users"
                                )
                            }
                        >
                            👥 Manage Users
                        </button>

                    </li>


                    {/* ADOPTION REQUESTS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/adoption-requests"
                                )
                            }
                        >
                            🐶 Adoption Requests
                        </button>

                    </li>


                    {/* CONTACT */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/manage-messages"
                                )
                            }
                        >
                            📩 Manage Contact
                        </button>

                    </li>


                    {/* ANALYTICS */}

                    <li className="mb-3">

                        <button
                            className="btn btn-dark w-100 text-start"
                            onClick={() =>
                                navigate(
                                    "/analytics"
                                )
                            }
                        >
                            📊 Analytics
                        </button>

                    </li>

                </ul>

            </div>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <div className="container-fluid p-5">

                <h1 className="mb-5">
                    Admin Dashboard
                </h1>


                <div className="row g-4">


                    {/* TOTAL PETS */}

                    <div className="col-md-4">

                        <div className="card shadow border-0 p-4">

                            <h3>
                                Total Pets
                            </h3>

                            <h1>
                                {pets.length}
                            </h1>

                        </div>

                    </div>


                    {/* AVAILABLE PETS */}

                    <div className="col-md-4">

                        <div className="card shadow border-0 p-4">

                            <h3>
                                Available Pets
                            </h3>

                            <h1>
                                {availablePets}
                            </h1>

                        </div>

                    </div>


                    {/* TOTAL USERS */}

                    <div className="col-md-4">

                        <div className="card shadow border-0 p-4">

                            <h3>
                                Total Users
                            </h3>

                            <h1>
                                {users.length}
                            </h1>

                        </div>

                    </div>

                </div>


                {/* QUICK ACTIONS */}

                <div className="card shadow border-0 p-4 mt-5">

                    <h3 className="mb-4">
                        Quick Actions
                    </h3>


                    <div className="row g-3">


                        <div className="col-md-4">

                            <button
                                className="btn btn-success w-100 p-3"
                                onClick={() =>
                                    navigate(
                                        "/manage-pets"
                                    )
                                }
                            >
                                🐾 Manage Pets
                            </button>

                        </div>


                        <div className="col-md-4">

                            <button
                                className="btn btn-primary w-100 p-3"
                                onClick={() =>
                                    navigate(
                                        "/manage-vets"
                                    )
                                }
                            >
                                🩺 Manage Veterinarians
                            </button>

                        </div>


                        <div className="col-md-4">

                            <button
                                className="btn btn-warning w-100 p-3"
                                onClick={() =>
                                    navigate(
                                        "/admin-vet-appointments"
                                    )
                                }
                            >
                                📅 Manage Vet Appointments
                            </button>

                        </div>

                    </div>

                </div>


                {/* RECENT ACTIVITIES */}

                <div className="card shadow border-0 p-5 mt-5">

                    <h2>
                        Recent Activities
                    </h2>

                    <ul className="mt-4">

                        <li>
                            User adopted Bruno
                        </li>

                        <li>
                            Admin added new pet
                        </li>

                        <li>
                            New user registered
                        </li>

                        <li>
                            Vet appointment requests
                            can be managed from
                            Vet Appointments
                        </li>

                    </ul>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;