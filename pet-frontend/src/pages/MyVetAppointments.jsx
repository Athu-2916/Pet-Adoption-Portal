import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";


function MyVetAppointments() {

    const [appointments,
        setAppointments] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [error,
        setError] = useState("");


    // =========================================
    // FETCH APPOINTMENTS
    // =========================================

    const fetchAppointments = async () => {

        try {

            setLoading(true);

            setError("");


            const userId =
                localStorage.getItem("userId");


            console.log(
                "MyVetAppointments userId:",
                userId
            );


            // =====================================
            // CHECK USER ID
            // =====================================

            if (
                !userId ||
                userId === "undefined" ||
                userId === "null"
            ) {

                setError(
                    "User session not found. Please login again."
                );

                setAppointments([]);

                return;
            }


            // =====================================
            // API REQUEST
            // =====================================

            const response =
                await axios.get(
                    `http://localhost:8080/vet-bookings/user/${userId}`
                );


            console.log(
                "Vet appointments:",
                response.data
            );


            setAppointments(
                response.data || []
            );


        } catch (error) {

            console.error(
                "Vet appointment error:",
                error
            );


            setError(
                "Unable to load your vet appointments."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchAppointments();

    }, []);


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="container mt-5">

                <h2>
                    🩺 My Vet Appointments
                </h2>

                <div className="alert alert-info mt-4">

                    Loading appointments...

                </div>

            </div>
        );
    }


    // =========================================
    // ERROR
    // =========================================

    if (error) {

        return (

            <div className="container mt-5">

                <h2 className="mb-4">

                    🩺 My Vet Appointments

                </h2>


                <div className="alert alert-danger">

                    {error}

                </div>


                <button
                    className="btn btn-primary"
                    onClick={fetchAppointments}
                >

                    🔄 Retry

                </button>

            </div>
        );
    }


    return (

        <div className="container mt-5 mb-5">

            <div
                className="d-flex justify-content-between align-items-center mb-4"
            >

                <h2>

                    🩺 My Vet Appointments

                </h2>


                <button
                    className="btn btn-outline-success"
                    onClick={fetchAppointments}
                >

                     Refresh

                </button>

            </div>


            {appointments.length === 0 ? (

                <div className="alert alert-info">

                    You don't have any veterinary
                    appointments.

                </div>

            ) : (

                <div className="row g-4">

                    {appointments.map(
                        appointment => (

                        <div
                            className="col-lg-6"
                            key={appointment.id}
                        >

                            <div className="card shadow h-100">

                                <div className="card-body p-4">

                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                    >

                                        <h4>

                                            Appointment #
                                            {appointment.id}

                                        </h4>


                                        <span
                                            className={
                                                appointment.status ===
                                                "APPROVED"
                                                    ? "badge bg-success"
                                                    : appointment.status ===
                                                      "REJECTED"
                                                    ? "badge bg-danger"
                                                    : "badge bg-warning text-dark"
                                            }
                                        >

                                            {appointment.status}

                                        </span>

                                    </div>


                                    <hr />


                                    <p>

                                        <strong>
                                             Pet:
                                        </strong>{" "}

                                        {appointment.petName}

                                    </p>


                                    <p>

                                        <strong>
                                             Vet ID:
                                        </strong>{" "}

                                        {appointment.vetId}

                                    </p>


                                    <p>

                                        <strong>
                                             Reason:
                                        </strong>{" "}

                                        {appointment.reason}

                                    </p>


                                    {/* APPROVED */}

                                    {appointment.status ===
                                    "APPROVED" && (

                                        <div
                                            className="alert alert-success mt-3"
                                        >

                                            <h5>

                                                 Appointment Confirmed

                                            </h5>


                                            <hr />


                                            <p className="mb-2">

                                                <strong>
                                                     Date:
                                                </strong>{" "}

                                                {appointment.appointmentDate}

                                            </p>


                                            <p className="mb-0">

                                                <strong>
                                                     Time:
                                                </strong>{" "}

                                                {appointment.appointmentTime}

                                            </p>

                                        </div>

                                    )}


                                    {/* PENDING */}

                                    {appointment.status ===
                                    "PENDING" && (

                                        <div
                                            className="alert alert-warning mt-3"
                                        >

                                            Your appointment request
                                            is waiting for admin approval.

                                        </div>

                                    )}


                                    {/* REJECTED */}

                                    {appointment.status ===
                                    "REJECTED" && (

                                        <div
                                            className="alert alert-danger mt-3"
                                        >

                                            Your appointment request
                                            was rejected by the admin.

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default MyVetAppointments;