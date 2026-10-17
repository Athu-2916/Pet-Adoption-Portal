import axios from 'axios';

const API_URL =
    'https://pet-adoption-portal-production.up.railway.app/favorites';


// =========================================
// ADD FAVORITE
// =========================================

export const addFavorite = (favorite) => {

    return axios.post(
        API_URL,
        favorite
    );
};


// =========================================
// GET CURRENT USER FAVORITES
// =========================================

export const getFavorites = (userId) => {

    return axios.get(
        `${API_URL}/pets/${userId}`
    );
};


// =========================================
// REMOVE FAVORITE
// =========================================

export const removeFavorite = (favoriteId) => {

    return axios.delete(
        `${API_URL}/${favoriteId}`
    );
};


// =========================================
// GET FAVORITE ID
// =========================================

export const getFavoriteId = (
    userId,
    petId
) => {

    return axios.get(
        `${API_URL}/pets/${userId}/${petId}`
    );
};