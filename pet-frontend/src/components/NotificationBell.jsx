import React, {
    useEffect,
    useState
} from "react";

import {
    getNotifications,
    unreadCount,
    markAsRead
} from "../services/notificationService";


function NotificationBell() {

    const [notifications,
        setNotifications] = useState([]);

    const [unread,
        setUnread] = useState(0);

    const [open,
        setOpen] = useState(false);

    const [loading,
        setLoading] = useState(false);


    // =========================================
    // GET USER ID
    // =========================================

    const getUserId = () => {

        const id =
            localStorage.getItem("userId");

        if (!id || id === "undefined" || id === "null") {

            return null;
        }

        return id;
    };


    // =========================================
    // LOAD NOTIFICATIONS
    // =========================================

    const loadNotifications = async () => {

        const userId = getUserId();

        if (!userId) {

            console.log(
                "NotificationBell: userId not found"
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await getNotifications(userId);


            setNotifications(
                response.data || []
            );


            const countResponse =
                await unreadCount(userId);


            setUnread(
                countResponse.data || 0
            );


        } catch (error) {

            console.error(
                "Notification loading error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        loadNotifications();

    }, []);


    // =========================================
    // OPEN / CLOSE
    // =========================================

    const toggleNotifications = () => {

        setOpen(
            previous => !previous
        );

        if (!open) {

            loadNotifications();
        }
    };


    // =========================================
    // MARK AS READ
    // =========================================

    const handleMarkAsRead = async (
        notification
    ) => {

        try {

            if (!notification.read) {

                await markAsRead(
                    notification.id
                );
            }


            setNotifications(
                previous =>
                    previous.map(item =>

                        item.id === notification.id
                            ? {
                                ...item,
                                read: true
                            }
                            : item
                    )
            );


            setUnread(
                previous =>
                    previous > 0
                        ? previous - 1
                        : 0
            );

        } catch (error) {

            console.error(
                "Mark notification error:",
                error
            );
        }
    };


    return (

        <div
            className="position-relative d-inline-block me-3"
        >

            {/* ================================= */}
            {/* BELL BUTTON */}
            {/* ================================= */}

            <button
                type="button"
                className="btn btn-dark position-relative"
                onClick={toggleNotifications}
                style={{
                    fontSize: "24px",
                    border: "none"
                }}
            >

                🔔


                {/* UNREAD BADGE */}

                {unread > 0 && (

                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{
                            fontSize: "10px"
                        }}
                    >

                        {unread > 99
                            ? "99+"
                            : unread
                        }

                    </span>

                )}

            </button>


            {/* ================================= */}
            {/* NOTIFICATION PANEL */}
            {/* ================================= */}

            {open && (

                <div
                    className="position-absolute bg-white shadow rounded border"
                    style={{
                        width: "380px",
                        maxHeight: "500px",
                        overflowY: "auto",
                        right: "0",
                        top: "50px",
                        zIndex: 9999
                    }}
                >

                    {/* HEADER */}

                    <div
                        className="d-flex justify-content-between align-items-center p-3 border-bottom"
                    >

                        <h5 className="mb-0">

                            🔔 Notifications

                        </h5>


                        <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                                setOpen(false)
                            }
                        >

                            ✕

                        </button>

                    </div>


                    {/* CONTENT */}

                    {loading ? (

                        <div className="text-center p-4">

                            Loading notifications...

                        </div>

                    ) : notifications.length === 0 ? (

                        <div className="text-center text-muted p-4">

                            No notifications

                        </div>

                    ) : (

                        notifications.map(
                            notification => (

                            <div
                                key={notification.id}
                                className={
                                    notification.read
                                        ? "p-3 border-bottom"
                                        : "p-3 border-bottom bg-light"
                                }
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={() =>
                                    handleMarkAsRead(
                                        notification
                                    )
                                }
                            >

                                <div className="d-flex">

                                    <div
                                        className="me-2"
                                        style={{
                                            fontSize: "20px"
                                        }}
                                    >

                                        {notification.type ===
                                        "ADOPTION_APPROVED"
                                            ? "🐾"
                                            : notification.type ===
                                              "ADOPTION_REJECTED"
                                            ? "❌"
                                            : notification.type ===
                                              "VET_APPOINTMENT_APPROVED"
                                            ? "🩺"
                                            : notification.type ===
                                              "VET_APPOINTMENT_REJECTED"
                                            ? "❌"
                                            : notification.type ===
                                              "VET_APPOINTMENT_BOOKED"
                                            ? "📅"
                                            : notification.type ===
                                              "NEW_PET"
                                            ? "🐶"
                                            : notification.type ===
                                              "FAVORITE_ADDED"
                                            ? "❤️"
                                            : "🔔"
                                        }

                                    </div>


                                    <div>

                                        <div
                                            className={
                                                notification.read
                                                    ? ""
                                                    : "fw-bold"
                                            }
                                        >

                                            {notification.message}

                                        </div>


                                        {notification.createdAt && (

                                            <small className="text-muted">

                                                {new Date(
                                                    notification.createdAt
                                                ).toLocaleString()}

                                            </small>

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

    );
}

export default NotificationBell;