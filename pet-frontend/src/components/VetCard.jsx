import React from "react";

function VetCard({ vet, onBook }) {

    return (

        <div className="card h-100 shadow-sm">

            <div className="card-body">

                <div
                    className="text-center mb-3"
                    style={{
                        fontSize: "50px"
                    }}
                >
                    🩺
                </div>

                <h4 className="text-center">
                    {vet.name}
                </h4>

                <p className="text-center text-muted">
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

                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={() => onBook(vet)}
                >
                     Book Appointment
                </button>

            </div>

        </div>
    );
}

export default VetCard;