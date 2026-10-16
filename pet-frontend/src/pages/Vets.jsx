import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Vets() {

    const navigate = useNavigate();

    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVets();
    }, []);

    const fetchVets = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/vets"
            );

            setVets(response.data);

        } catch (error) {

            console.error(
                "Error fetching veterinarians:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const handleBookAppointment = (vet) => {

        const userId =
            localStorage.getItem("userId");

        if (!userId) {

            alert(
                "Please login to book an appointment."
            );

            navigate("/login");

            return;
        }

        navigate("/vet-booking", {
            state: {
                vet: vet
            }
        });
    };

    if (loading) {

        return (
            <div className="container mt-5 text-center">

                <h3>
                    Loading veterinarians...
                </h3>

            </div>
        );
    }

    return (

        <div className="container mt-5 mb-5">

            <h1 className="text-center mb-3">
                🩺 Veterinary Doctors
            </h1>

            <p className="text-center text-muted mb-5">
                Consult experienced veterinarians
                for your pet's health and care.
            </p>

            {vets.length === 0 ? (

                <div className="alert alert-info text-center">

                    No veterinarians available.

                </div>

            ) : (

                <div className="row g-4">

                    {vets.map((vet) => (

                        <div
                            className="col-lg-4 col-md-6"
                            key={vet.id}
                        >

                            <div className="card shadow h-100">

                                {vet.imageUrl && (

                                    <img
                                        src={vet.imageUrl}
                                        className="card-img-top"
                                        alt={vet.name}
                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}
                                    />

                                )}

                                <div className="card-body">

                                    <h4 className="card-title">
                                        {vet.name}
                                    </h4>

                                    <p className="text-success fw-bold">
                                        {vet.specialization}
                                    </p>

                                    <hr />

                                    <p>
                                        <strong>
                                            Experience:
                                        </strong>{" "}
                                        {vet.experience} years
                                    </p>

                                    <p>
                                        <strong>
                                            Clinic:
                                        </strong>{" "}
                                        {vet.clinicName}
                                    </p>

                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}
                                        {vet.location}
                                    </p>

                                    <p>
                                        <strong>
                                            Consultation Fee:
                                        </strong>{" "}
                                        ₹{vet.fee}
                                    </p>

                                    <p>
                                        <strong>
                                            Available Days:
                                        </strong>{" "}
                                        {vet.availableDays}
                                    </p>

                                    <p>
                                        <strong>
                                            Available Time:
                                        </strong>{" "}
                                        {vet.availableTime}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>{" "}
                                        {vet.phone}
                                    </p>

                                    <p>
                                        <strong>
                                            Email:
                                        </strong>{" "}
                                        {vet.email}
                                    </p>

                                    <button
                                        className="btn btn-success w-100 mt-3"
                                        onClick={() =>
                                            handleBookAppointment(vet)
                                        }
                                    >
                                        Book Appointment
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Vets;