import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';


function MyAdoptions() {

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
    // FETCH CURRENT USER'S REQUESTS
    // =========================================

    const fetchRequests = async () => {

        try {

            setLoading(true);
            setError('');


            const userId =
                localStorage.getItem(
                    'userId'
                );


            if (!userId) {

                setError(
                    'Please login to view your adoption requests.'
                );

                setLoading(false);

                return;
            }


            const response =
                await axios.get(
                    `http://localhost:8080/adoptions/user/${userId}`
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
    // STATUS DISPLAY
    // =========================================

    const getStatusBadge = (status) => {

        if (status === 'APPROVED') {

            return (
                <span className="badge bg-success">
                    Approved
                </span>
            );

        }


        if (status === 'REJECTED') {

            return (
                <span className="badge bg-danger">
                    Rejected
                </span>
            );

        }


        return (
            <span className="badge bg-warning text-dark">
                Pending
            </span>
        );
    };


    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                My Adoption Requests
            </h2>


            {/* LOADING */}

            {loading && (

                <div className="alert alert-info">

                    Loading your adoption requests...

                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* EMPTY */}

            {!loading &&
             !error &&
             requests.length === 0 && (

                <div className="alert alert-info">

                    You have not submitted any
                    adoption requests yet.

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
                                    Pet
                                </th>

                                <th>
                                    Status
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

                                    <td>
                                        {
                                            request.id
                                        }
                                    </td>


                                    <td>
                                        {
                                            request.pet?.name
                                            ||
                                            'Unknown Pet'
                                        }
                                    </td>


                                    <td>
                                        {
                                            getStatusBadge(
                                                request.status
                                            )
                                        }
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

export default MyAdoptions;