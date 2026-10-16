import axios from "axios";

const API =
    "http://localhost:8080/notifications";


export const getNotifications = (userId) => {

    return axios.get(
        `${API}/${userId}`
    );
};


export const unreadCount = (userId) => {

    return axios.get(
        `${API}/count/${userId}`
    );
};


export const markAsRead = (id) => {

    return axios.put(
        `${API}/read/${id}`
    );
};


export const deleteNotification = (id) => {

    return axios.delete(
        `${API}/${id}`
    );
};