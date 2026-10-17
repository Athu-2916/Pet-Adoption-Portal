import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageVetBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [vets, setVets] = useState([]);

    const [dates, setDates] = useState({});
    const [times, setTimes] = useState({});

    const [loading, setLoading] = useState(true);


    // ==========================================
    // FETCH BOOKINGS + VETS
    // ==========================================

    useEffect(() => {

        fetchData();

    }, []);


    const fetchData = async () => {

        try {

            setLoading(true);

            const bookingsResponse =
                await axios.get(
                    "https://pet-adoption-portal-production.up.railway.app/vet-bookings"
                );

            const vetsResponse =
                await axios.get(
                    "https://pet-adoption-portal-production.up.railway.app/vets"
                );

            setBookings(
                bookingsResponse.data
            );

            setVets(
                vetsResponse.data
            );

        } catch (error) {

            console.error(
                "Error fetching data:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // GET VET NAME USING vetId
    // ==========================================

    const getVetName = (vetId) => {

        const vet = vets.find(
            (v) =>
                Number(v.id) === Number(vetId)
        );

        return vet
            ? vet.name
            : "Unknown Veterinarian";

    };


    // ==========================================
    // GET CLINIC
    // ==========================================

    const getClinicName = (vetId) => {

        const vet = vets.find(
            (v) =>
                Number(v.id) === Number(vetId)
        );

        return vet
            ? vet.clinicName
            : "-";

    };


    // ==========================================
    // DATE CHANGE
    // ==========================================

    const handleDateChange = (
        id,
        value
    ) => {

        setDates({
            ...dates,
            [id]: value
        });

    };


    // ==========================================
    // TIME CHANGE
    // ==========================================

    const handleTimeChange = (
        id,
        value
    ) => {

        setTimes({
            ...times,
            [id]: value
        });

    };


    // ==========================================
    // APPROVE BOOKING
    // ==========================================

    const approveBooking = async (id) => {

        const appointmentDate =
            dates[id];

        const appointmentTime =
            times[id];


        if (
            !appointmentDate ||
            !appointmentTime
        ) {

            alert(
                "Please select appointment date and time."
            );

            return;

        }


        try {

            await axios.put(

                `https://pet-adoption-portal-production.up.railway.app/vet-bookings/${id}/approve`,

                {
                    appointmentDate:
                        appointmentDate,

                    appointmentTime:
                        appointmentTime
                }

            );


            alert(
                "Appointment approved successfully!"
            );


            fetchData();


        } catch (error) {

            console.error(
                "Approval error:",
                error
            );

            alert(
                "Failed to approve appointment."
            );

        }

    };


    // ==========================================
    // REJECT BOOKING
    // ==========================================

    const rejectBooking = async (id) => {

        const confirmReject =
            window.confirm(
                "Are you sure you want to reject this appointment?"
            );


        if (!confirmReject) {

            return;

        }


        try {

            await axios.put(
                `https://pet-adoption-portal-production.up.railway.app/vet-bookings/${id}/reject`
            );


            alert(
                "Appointment rejected."
            );


            fetchData();


        } catch (error) {

            console.error(
                "Reject error:",
                error
            );

            alert(
                "Failed to reject appointment."
            );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="container mt-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                    />

                    <h4 className="mt-3">
                        Loading appointments...
                    </h4>

                </div>

            </div>

        );

    }


    return (

        <div className="container mt-5 mb-5">

            {/* BACK */}

            <button
                className="btn btn-dark mb-4"
                onClick={() =>
                    navigate("/admin")
                }
            >
                ← Back to Admin
            </button>


            {/* TITLE */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>
                        🩺 Veterinary Appointment Requests
                    </h2>

                    <p className="text-muted">
                        Manage and approve veterinary appointments.
                    </p>

                </div>


                <button
                    className="btn btn-outline-primary"
                    onClick={fetchData}
                >
                     Refresh
                </button>

            </div>


            {/* SUMMARY */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Requests
                            </h6>

                            <h2>
                                {bookings.length}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Pending
                            </h6>

                            <h2 className="text-warning">

                                {
                                    bookings.filter(
                                        booking =>
                                            booking.status ===
                                            "PENDING"
                                    ).length
                                }

                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Approved
                            </h6>

                            <h2 className="text-success">

                                {
                                    bookings.filter(
                                        booking =>
                                            booking.status ===
                                            "APPROVED"
                                    ).length
                                }

                            </h2>

                        </div>

                    </div>

                </div>

            </div>


            {/* TABLE */}

            {bookings.length === 0 ? (

                <div className="alert alert-info text-center">

                    <h5>
                        No appointment requests.
                    </h5>

                    <p className="mb-0">
                        User appointment requests will appear here.
                    </p>

                </div>

            ) : (

                <div className="card shadow">

                    <div className="card-body">

                        <div className="table-responsive">

                            <table
                                className="table table-bordered table-hover align-middle"
                            >

                                <thead className="table-dark">

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            User ID
                                        </th>

                                        <th>
                                            Vet
                                        </th>

                                        <th>
                                            Clinic
                                        </th>

                                        <th>
                                            Pet
                                        </th>

                                        <th>
                                            Reason
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Appointment Date
                                        </th>

                                        <th>
                                            Appointment Time
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {bookings.map(
                                        booking => (

                                        <tr
                                            key={
                                                booking.id
                                            }
                                        >

                                            <td>
                                                {booking.id}
                                            </td>


                                            <td>
                                                {booking.userId}
                                            </td>


                                            <td>

                                                <strong>
                                                    {getVetName(
                                                        booking.vetId
                                                    )}
                                                </strong>

                                            </td>


                                            <td>
                                                {getClinicName(
                                                    booking.vetId
                                                )}
                                            </td>


                                            <td>
                                                {booking.petName}
                                            </td>


                                            <td>
                                                {booking.reason}
                                            </td>


                                            <td>

                                                {booking.status ===
                                                "APPROVED" ? (

                                                    <span className="badge bg-success">
                                                        APPROVED
                                                    </span>

                                                ) : booking.status ===
                                                  "REJECTED" ? (

                                                    <span className="badge bg-danger">
                                                        REJECTED
                                                    </span>

                                                ) : (

                                                    <span className="badge bg-warning text-dark">
                                                        PENDING
                                                    </span>

                                                )}

                                            </td>


                                            {/* DATE */}

                                            <td>

                                                {booking.status ===
                                                "PENDING" ? (

                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        min={
                                                            new Date()
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }
                                                        value={
                                                            dates[
                                                                booking.id
                                                            ] || ""
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleDateChange(
                                                                booking.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                ) : (

                                                    booking.appointmentDate ||
                                                    "-"

                                                )}

                                            </td>


                                            {/* TIME */}

                                            <td>

                                                {booking.status ===
                                                "PENDING" ? (

                                                    <input
                                                        type="time"
                                                        className="form-control"
                                                        value={
                                                            times[
                                                                booking.id
                                                            ] || ""
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleTimeChange(
                                                                booking.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                ) : (

                                                    booking.appointmentTime
                                                        ? booking.appointmentTime.substring(
                                                            0,
                                                            5
                                                        )
                                                        : "-"

                                                )}

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                {booking.status ===
                                                "PENDING" && (

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                approveBooking(
                                                                    booking.id
                                                                )
                                                            }
                                                        >
                                                             Accept
                                                        </button>


                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                rejectBooking(
                                                                    booking.id
                                                                )
                                                            }
                                                        >
                                                             Reject
                                                        </button>

                                                    </div>

                                                )}


                                                {booking.status ===
                                                "APPROVED" && (

                                                    <span className="text-success fw-bold">
                                                         Confirmed
                                                    </span>

                                                )}


                                                {booking.status ===
                                                "REJECTED" && (

                                                    <span className="text-danger fw-bold">
                                                         Rejected
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ManageVetBookings;