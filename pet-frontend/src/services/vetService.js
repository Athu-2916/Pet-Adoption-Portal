import axios from "axios";

const API_URL = "https://pet-adoption-portal-production.up.railway.app/vets";


export const getVets = () => {

    return axios.get(API_URL);

};


export const getVet = (id) => {

    return axios.get(
        `${API_URL}/${id}`
    );

};


export const addVet = (vet) => {

    return axios.post(
        API_URL,
        vet
    );

};


export const updateVet = (id, vet) => {

    return axios.put(
        `${API_URL}/${id}`,
        vet
    );

};


export const deleteVet = (id) => {

    return axios.delete(
        `${API_URL}/${id}`
    );

};