import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VetBooking() {

    const navigate = useNavigate();

    const location = useLocation();

    const vet = location.state?.vet;

    const [petName, setPetName] = useState("");

    const [reason, setReason] = useState("");

    const [message, setMessage] = useState("");

    if (!vet) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger">

                    Veterinarian information not found.

                </div>

                <button
                    className="btn btn-dark"
                    onClick={() => navigate("/vets")}
                >
                    ← Back to Veterinarians
                </button>

            </div>

        );
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const userId =
                localStorage.getItem("userId");

            if (!userId) {

                alert(
                    "Please login before booking an appointment."
                );

                navigate("/login");

                return;
            }

            const booking = {

                userId: Number(userId),

                vetId: vet.id,

                petName: petName,

                reason: reason,

                status: "PENDING"

            };

            await axios.post(
                "http://localhost:8080/vet-bookings",
                booking
            );

            setMessage(
                "Appointment request submitted successfully!"
            );

            setPetName("");

            setReason("");

        } catch (error) {

            console.log(error);

            setMessage(
                "Failed to book appointment."
            );
        }
    };

    return (

        <div className="container mt-5 mb-5">

            <button
                className="btn btn-dark mb-4"
                onClick={() => navigate("/vets")}
            >
                ← Back to Veterinarians
            </button>


            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow">

                        {vet.imageUrl && (

                            <img
                                src={vet.imageUrl}
                                alt={vet.name}
                                className="card-img-top"
                                style={{
                                    height: "300px",
                                    objectFit: "cover"
                                }}
                            />

                        )}

                        <div className="card-body p-4">

                            <h2 className="mb-3">

                                Book Appointment

                            </h2>


                            <div className="alert alert-info">

                                <h4>
                                    {vet.name}
                                </h4>

                                <p className="mb-1">

                                    <strong>
                                        Specialization:
                                    </strong>{" "}

                                    {vet.specialization}

                                </p>

                                <p className="mb-1">

                                    <strong>
                                        Experience:
                                    </strong>{" "}

                                    {vet.experience} years

                                </p>

                                <p className="mb-1">

                                    <strong>
                                        Clinic:
                                    </strong>{" "}

                                    {vet.clinicName}

                                </p>

                                <p className="mb-1">

                                    <strong>
                                        Location:
                                    </strong>{" "}

                                    {vet.location}

                                </p>

                                <p className="mb-1">

                                    <strong>
                                        Consultation Fee:
                                    </strong>{" "}

                                    ₹{vet.fee}

                                </p>

                                <p className="mb-1">

                                    <strong>
                                        Available:
                                    </strong>{" "}

                                    {vet.availableDays}

                                </p>

                                <p className="mb-0">

                                    <strong>
                                        Time:
                                    </strong>{" "}

                                    {vet.availableTime}

                                </p>

                            </div>


                            {message && (

                                <div className="alert alert-success">

                                    {message}

                                    <br />

                                    <button
                                        className="btn btn-sm btn-primary mt-2"
                                        onClick={() =>
                                            navigate(
                                                "/my-vet-appointments"
                                            )
                                        }
                                    >
                                        View My Appointments
                                    </button>

                                </div>

                            )}


                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label className="form-label">

                                        Pet Name

                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your pet's name"
                                        value={petName}
                                        onChange={(e) =>
                                            setPetName(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">

                                        Reason for Visit

                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Describe your pet's problem or reason for consultation"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <div className="alert alert-warning">

                                    <strong>
                                        Note:
                                    </strong>

                                    <br />

                                    Your appointment will first be
                                    sent to the admin for approval.
                                    The admin will assign the final
                                    appointment date and time.

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >

                                    📅 Book Appointment

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default VetBooking;