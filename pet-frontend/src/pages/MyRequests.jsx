import React, {
    useEffect,
    useState
} from 'react';

import axios from 'axios';

import BackButton
    from '../components/BackButton';


function MyRequests() {

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
    // FETCH ONLY LOGGED-IN USER REQUESTS
    // =========================================

    const fetchRequests = async () => {

        try {

            setLoading(true);
            setError('');


            const userId =
                localStorage.getItem(
                    'userId'
                );


            // Check whether user is logged in

            if (!userId) {

                setError(
                    'Please login to view your adoption requests.'
                );

                setLoading(false);

                return;
            }


            const response =
                await axios.get(
                    `https://pet-adoption-portal-production.up.railway.app/adoptions/user/${userId}`
                );


            setRequests(
                response.data
            );


        } catch (error) {

            console.error(
                'Error fetching requests:',
                error
            );

            setError(
                'Unable to load your adoption requests.'
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="container mt-5">

            <BackButton
                destination="/"
            />


            <h2 className="mb-4">
                My Adoption Requests
            </h2>


            {/* =================================
                LOADING
            ================================== */}

            {loading && (

                <div className="alert alert-info">

                    Loading your requests...

                </div>

            )}


            {/* =================================
                ERROR
            ================================== */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* =================================
                NO REQUESTS
            ================================== */}

            {!loading &&
             !error &&
             requests.length === 0 && (

                <div className="alert alert-info">

                    You have not submitted any
                    adoption requests yet.

                </div>

            )}


            {/* =================================
                REQUEST TABLE
            ================================== */}

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
                                            'Pet'
                                        }
                                    </td>


                                    <td>

                                        {request.status ===
                                        'APPROVED' ? (

                                            <span className="badge bg-success">
                                                Approved
                                            </span>

                                        ) : request.status ===
                                          'REJECTED' ? (

                                            <span className="badge bg-danger">
                                                Rejected
                                            </span>

                                        ) : (

                                            <span className="badge bg-warning text-dark">
                                                Pending
                                            </span>

                                        )}

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

export default MyRequests;