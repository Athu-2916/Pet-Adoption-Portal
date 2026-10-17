import axios from "axios";

const API = "https://pet-adoption-portal-production.up.railway.app/vet-bookings";

export const bookVetAppointment = (booking) => {
    return axios.post(API, booking);
};

export const getAllVetBookings = () => {
    return axios.get(API);
};

export const getUserVetBookings = (userId) => {
    return axios.get(`${API}/user/${userId}`);
};

export const updateVetBooking = (id, booking) => {
    return axios.put(`${API}/${id}`, booking);
};

export const deleteVetBooking = (id) => {
    return axios.delete(`${API}/${id}`);
};