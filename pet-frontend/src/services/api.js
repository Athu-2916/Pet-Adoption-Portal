import axios from 'axios';

const BASE_URL = 'https://pet-adoption-portal-production.up.railway.app/pets';

export const getAllPets = () => {
    return axios.get(BASE_URL);
};

export const addPet = (pet) => {
    return axios.post(BASE_URL, pet);
};