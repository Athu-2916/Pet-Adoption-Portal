import axios from 'axios';

const API_URL = 'https://pet-adoption-portal-production.up.railway.app/pets';

export const getAllPets = () => {

    return axios.get(API_URL);
};

export const deletePet = (id) => {

    return axios.delete(`${API_URL}/${id}`);
};

export const updatePet = (id, pet) => {

    return axios.put(`${API_URL}/${id}`, pet);
};

export const addPet = (pet) => {

    return axios.post(API_URL, pet);
};