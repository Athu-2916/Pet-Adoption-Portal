import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';

import BackButton
    from '../components/BackButton';


function AdoptionRequests() {

    const [requests, setRequests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');


    useEffect(() => {

        fetchRequests();

    }, []);


    // =========================================
    // FETCH ALL REQUESTS
    // ADMIN USE ONLY
    // =========================================

    const fetchRequests = async () => {

        try {

            setLoading(true);
            setError('');


            const response =
                await axios.get(
                    'http://localhost:8080/adoptions'
                );


            setRequests(
                response.data
            );


        } catch (error) {

            console.error(
                'Error fetching adoption requests:',
                error
            );

            setError(
                'Unable to load adoption requests.'
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // UPDATE REQUEST STATUS
    // =========================================

    const updateStatus =
        async (
            id,
            status
        ) => {

        try {

            await axios.put(
                `http://localhost:8080/adoptions/${id}`,
                {
                    status: status
                }
            );


            // Refresh table
            fetchRequests();


        } catch (error) {

            console.error(
                'Error updating request:',
                error
            );

            alert(
                'Unable to update adoption request.'
            );
        }
    };


    return (

        <div className="container mt-5">

            <BackButton
                destination="/admin"
            />


            <h2 className="mb-4">
                Adoption Requests
            </h2>


            {/* LOADING */}

            {loading && (

                <div className="alert alert-info">

                    Loading adoption requests...

                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* NO REQUESTS */}

            {!loading &&
             !error &&
             requests.length === 0 && (

                <div className="alert alert-info">

                    No adoption requests found.

                </div>

            )}


            {/* REQUEST TABLE */}

            {!loading &&
             !error &&
             requests.length > 0 && (

                <div className="table-responsive">

                    <table
                        className="table table-bordered table-hover"
                    >

                        <thead className="table-dark">

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    User
                                </th>

                                <th>
                                    Pet
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {requests.map(
                                (request) => (

                                <tr
                                    key={
                                        request.id
                                    }
                                >

                                    {/* ID */}

                                    <td>
                                        {
                                            request.id
                                        }
                                    </td>


                                    {/* USER */}

                                    <td>
                                        {
                                            request.user?.name
                                            ||
                                            request.user?.id
                                            ||
                                            'Unknown User'
                                        }
                                    </td>


                                    {/* PET */}

                                    <td>
                                        {
                                            request.pet?.name
                                            ||
                                            'Unknown Pet'
                                        }
                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        {request.status ===
                                        'APPROVED' ? (

                                            <span className="badge bg-success">
                                                APPROVED
                                            </span>

                                        ) : request.status ===
                                          'REJECTED' ? (

                                            <span className="badge bg-danger">
                                                REJECTED
                                            </span>

                                        ) : (

                                            <span className="badge bg-warning text-dark">
                                                PENDING
                                            </span>

                                        )}

                                    </td>


                                    {/* ACTIONS */}

                                    <td>

                                        <button
                                            className="btn btn-success me-2"
                                            disabled={
                                                request.status ===
                                                'APPROVED'
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    request.id,
                                                    'APPROVED'
                                                )
                                            }
                                        >
                                            Approve
                                        </button>


                                        <button
                                            className="btn btn-danger"
                                            disabled={
                                                request.status ===
                                                'REJECTED'
                                            }
                                            onClick={() =>
                                                updateStatus(
                                                    request.id,
                                                    'REJECTED'
                                                )
                                            }
                                        >
                                            Reject
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

export default AdoptionRequests;