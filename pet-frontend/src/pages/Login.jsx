import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const response = await axios.post(
                "https://pet-adoption-portal-production.up.railway.app/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );


            console.log(
                "LOGIN RESPONSE:",
                response.data
            );


            // =====================================
            // GET DATA FROM BACKEND
            // =====================================

            const token =
                response.data.token;

            const userId =
                response.data.userId;

            const role =
                response.data.role;


            console.log(
                "TOKEN:",
                token
            );

            console.log(
                "USER ID:",
                userId
            );

            console.log(
                "ROLE:",
                role
            );


            // =====================================
            // CHECK USER ID
            // =====================================

            if (
                userId === undefined ||
                userId === null
            ) {

                console.error(
                    "Backend did not return userId",
                    response.data
                );

                setError(
                    "Login successful but user ID was not returned by server."
                );

                return;
            }


            // =====================================
            // SAVE LOGIN INFORMATION
            // =====================================

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "userId",
                String(userId)
            );

            localStorage.setItem(
                "role",
                role
            );


            console.log(
                "LOCAL STORAGE userId:",
                localStorage.getItem("userId")
            );

            console.log(
                "LOCAL STORAGE role:",
                localStorage.getItem("role")
            );


            // =====================================
            // TELL NAVBAR THAT LOGIN CHANGED
            // =====================================

            window.dispatchEvent(
                new Event("storage")
            );


            // =====================================
            // REDIRECT BASED ON ROLE
            // =====================================

            if (
                role &&
                role.toUpperCase() === "ADMIN"
            ) {

                navigate("/admin");

            } else {

                navigate("/");
            }


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                if (
                    typeof error.response.data ===
                    "string"
                ) {

                    setError(
                        error.response.data
                    );

                } else {

                    setError(
                        "Invalid email or password."
                    );
                }

            } else {

                setError(
                    "Unable to connect to server."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>


                            {error && (

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            )}


                            <form
                                onSubmit={handleLogin}
                            >

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Logging in..."
                                        : "Login"
                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;