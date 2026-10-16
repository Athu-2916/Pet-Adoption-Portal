import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:8080/auth/register',
                user
            );

            console.log(response.data);

            setMessage('Registration Successful');

            setUser({
                name: '',
                email: '',
                password: '',
                phone: '',
                address: ''
            });

            // Navigate after successful registration
            navigate('/login');

        } catch (error) {

            console.error('Registration Error:', error);

            if (error.response) {
                console.error('Backend Response:', error.response.data);
            }

            setMessage('Registration Failed');
        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            User Registration
                        </h2>

                        {message && (

                            <div className="alert alert-info">
                                {message}
                            </div>

                        )}

                        <form onSubmit={handleSubmit}>

                            {/* Full Name */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                            </div>


                            {/* Email */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />

                            </div>


                            {/* Password */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                />

                            </div>


                            {/* Phone */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />

                            </div>


                            {/* Address */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Address
                                </label>

                                <textarea
                                    className="form-control"
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                    placeholder="Enter your address"
                                    rows="3"
                                    required
                                />

                            </div>


                            {/* Register Button */}
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                Register
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;