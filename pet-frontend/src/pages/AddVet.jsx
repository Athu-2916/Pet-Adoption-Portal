import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddVet() {

    const navigate = useNavigate();

    const [vet, setVet] = useState({

        name: "",
        specialization: "",
        experience: "",
        clinicName: "",
        location: "",
        fee: "",
        phone: "",
        email: "",
        availableDays: "",
        availableTime: ""

    });


    const handleChange = (e) => {

        setVet({
            ...vet,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "https://pet-adoption-portal-production.up.railway.app/vets",
                {
                    ...vet,
                    experience:
                        Number(vet.experience),
                    fee:
                        Number(vet.fee)
                }
            );

            alert(
                "Veterinarian added successfully!"
            );

            navigate("/manage-vets");

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Failed to add veterinarian."
            );
        }

    };


    return (

        <div className="container mt-5 mb-5">

            <button
                className="btn btn-dark mb-4"
                onClick={() =>
                    navigate("/manage-vets")
                }
            >
                ← Back
            </button>


            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-body p-5">

                            <h2 className="text-center mb-4">
                                Add Veterinarian
                            </h2>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                            >

                                <div className="row">


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Doctor Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={
                                                vet.name
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Specialization
                                        </label>

                                        <input
                                            type="text"
                                            name="specialization"
                                            className="form-control"
                                            value={
                                                vet.specialization
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Experience
                                        </label>

                                        <input
                                            type="number"
                                            name="experience"
                                            className="form-control"
                                            value={
                                                vet.experience
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Consultation Fee
                                        </label>

                                        <input
                                            type="number"
                                            name="fee"
                                            className="form-control"
                                            value={
                                                vet.fee
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Clinic Name
                                        </label>

                                        <input
                                            type="text"
                                            name="clinicName"
                                            className="form-control"
                                            value={
                                                vet.clinicName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            className="form-control"
                                            value={
                                                vet.location
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            value={
                                                vet.phone
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={
                                                vet.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Available Days
                                        </label>

                                        <input
                                            type="text"
                                            name="availableDays"
                                            className="form-control"
                                            placeholder="Monday - Saturday"
                                            value={
                                                vet.availableDays
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Available Time
                                        </label>

                                        <input
                                            type="text"
                                            name="availableTime"
                                            className="form-control"
                                            placeholder="10:00 AM - 2:00 PM"
                                            value={
                                                vet.availableTime
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-success w-100 mt-3"
                                >
                                    Add Veterinarian
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AddVet;