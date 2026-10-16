import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageVets() {

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

            console.error("Error fetching vets:", error);

            alert("Failed to load veterinarians.");

        } finally {

            setLoading(false);

        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this veterinarian?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/vets/${id}`
            );

            alert("Veterinarian deleted successfully.");

            fetchVets();

        } catch (error) {

            console.error("Error deleting vet:", error);

            alert(
                "Unable to delete veterinarian."
            );
        }
    };

    return (

        <div className="container mt-5 mb-5">

            {/* BACK BUTTON */}

            <button
                className="btn btn-dark mb-4"
                onClick={() => navigate("/admin")}
            >
                ← Back to Dashboard
            </button>


            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Manage Veterinarians
                </h1>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/add-vet")}
                >
                    + Add New Vet
                </button>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="text-center mt-5">

                    <h4>
                        Loading veterinarians...
                    </h4>

                </div>

            )}


            {/* EMPTY */}

            {!loading && vets.length === 0 && (

                <div className="alert alert-info text-center">

                    No veterinarians found.

                </div>

            )}


            {/* TABLE */}

            {!loading && vets.length > 0 && (

                <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Specialization</th>

                                <th>Experience</th>

                                <th>Clinic</th>

                                <th>Location</th>

                                <th>Fee</th>

                                <th>Available Days</th>

                                <th>Available Time</th>

                                <th>Phone</th>

                                <th>Email</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            {vets.map((vet) => (

                                <tr key={vet.id}>

                                    <td>
                                        {vet.id}
                                    </td>

                                    <td>
                                        <strong>
                                            {vet.name}
                                        </strong>
                                    </td>

                                    <td>
                                        {vet.specialization}
                                    </td>

                                    <td>
                                        {vet.experience} years
                                    </td>

                                    <td>
                                        {vet.clinicName}
                                    </td>

                                    <td>
                                        {vet.location}
                                    </td>

                                    <td>
                                        ₹{vet.fee}
                                    </td>

                                    <td>
                                        {vet.availableDays}
                                    </td>

                                    <td>
                                        {vet.availableTime}
                                    </td>

                                    <td>
                                        {vet.phone}
                                    </td>

                                    <td>
                                        {vet.email}
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(
                                                    vet.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default ManageVets;