import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import UserProfile from '../UserProfile/UserProfile'; // Импортируем UserProfile
import "./Movie.css";
import "./MovieList.css";

const MovieList = ({onAdd}) => {
    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://yts.mx/api/v2/list_movies.json?quality=3D&limit=50");
                setMovies(response.data.data.movies || []);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="movies">
                {movies.map((movie) => (
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        year={movie.year}
                        title={movie.title}
                        rating={movie.rating}
                        summary={movie.summary}
                        poster={movie.medium_cover_image}
                        genres={movie.genres}
                        flag = {true}
                        largePoster={movie.large_cover_image}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;