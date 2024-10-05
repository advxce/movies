import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./Movie.css";
import "./MovieList.css";
import {Input} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



const MovieList = ({ onAdd }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

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

    // Фильтрация фильмов по названию
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="container">
            <div className='input--container'>
                <div className='input--constructor'>
                    <Input
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="movie-filter"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <SearchIcon />
                </div>

            </div>


            <div className="movies">
                {filteredMovies.map((movie) => (
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        year={movie.year}
                        title={movie.title}
                        rating={movie.rating}
                        summary={movie.summary}
                        poster={movie.medium_cover_image}
                        genres={movie.genres}
                        flag={true}
                        largePoster={movie.large_cover_image}
                        state={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;