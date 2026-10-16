import React, {
    useEffect,
    useState
} from 'react';

import {
    getFavorites,
    removeFavorite
} from '../services/favoriteService';

import PetCard
    from '../components/PetCard';

import BackButton
    from '../components/BackButton';


function Favorites() {

    const [pets, setPets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');


    useEffect(() => {

        fetchFavorites();

    }, []);


    // =========================================
    // FETCH ONLY LOGGED-IN USER FAVORITES
    // =========================================

    const fetchFavorites = async () => {

        try {

            setLoading(true);
            setError('');


            const userId =
                localStorage.getItem(
                    'userId'
                );


            if (!userId) {

                setError(
                    'Please login to view your favorite pets.'
                );

                setLoading(false);

                return;
            }


            const response =
                await getFavorites(
                    userId
                );


            setPets(
                response.data
            );


        } catch (error) {

            console.error(
                'Error fetching favorites:',
                error
            );

            setError(
                'Unable to load your favorite pets.'
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // REMOVE FAVORITE
    // =========================================

    const handleRemoveFavorite =
        async (favoriteId) => {

        try {

            await removeFavorite(
                favoriteId
            );


            // Refresh favorites
            fetchFavorites();


        } catch (error) {

            console.error(
                'Error removing favorite:',
                error
            );

        }
    };


    return (

        <div className="container mt-5">

            <BackButton
                destination="/"
            />


            <h2 className="mb-4 text-center">

                ❤️ My Favorite Pets

            </h2>


            {/* LOADING */}

            {loading && (

                <div className="alert alert-info">

                    Loading your favorite pets...

                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* NO FAVORITES */}

            {!loading &&
             !error &&
             pets.length === 0 && (

                <div className="alert alert-info">

                    No Favorite Pets Yet

                </div>

            )}


            {/* FAVORITE PETS */}

            {!loading &&
             !error &&
             pets.length > 0 && (

                <div className="row g-4">

                    {pets.map(
                        (item) => (

                        <div
                            key={
                                item.pet.id
                            }
                            className="col-lg-4 col-md-6 col-12"
                        >

                            <PetCard
                                pet={
                                    item.pet
                                }

                                onRemove={() =>
                                    handleRemoveFavorite(
                                        item.favoriteId
                                    )
                                }
                            />

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Favorites;