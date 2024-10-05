import React, { useState, useEffect, useContext } from 'react';
import Movie from '../Movies/Movie';
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import './UserProfile.css'
import {Input} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const UserProfile = () => {
    const [movies, setMovies] = useState([]);
    const { firestore } = useContext(Context);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesCollection = collection(firestore, `${user.email}_movies`);
                const movieSnapshot = await getDocs(moviesCollection);
                const movieList = movieSnapshot.docs.map(doc => ({
                    docID: doc.id, // Используем doc.id здесь
                    ...doc.data()
                }));
                setMovies(movieList);
            } catch (error) {
                console.error("Ошибка при получении фильмов:", error);
            }
        };

        if (user) { // Проверка, что пользователь авторизован
            fetchMovies();
        }
    }, [firestore, user]);

    const handleDelete = async (docID) => {
        console.log('Попытка удалить фильм с ID:', docID);
        try {
            const movieDoc = doc(firestore, `${user.email}_movies`, docID); // Преобразуем ID в строку
            await deleteDoc(movieDoc);
            console.log('Фильм удален из базы данных!');

            // Обновляем состояние после удаления
            setMovies(movies.filter(movie => movie.docID !== docID));
        } catch (error) {
            console.error('Ошибка при удалении фильма:', error);
        }
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (

        <div>
            <div className='input--container'>
                <div className='input--constructor'>
                    <Input
                        sx={{ml: 1, flex: 1}}
                        placeholder="Search by name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="movie-filter"
                        inputProps={{'aria-label': 'search google maps'}}
                    />
                    <SearchIcon/>
                </div>

            </div>
            <div className="user-profile">


                <div className="movies">
                    {movies.length > 0 ? (
                        filteredMovies.map(movie => (
                            <div key={movie.id}>
                                <Movie
                                    id={movie.id}
                                    title={movie.title}
                                    year={movie.year}
                                    summary={movie.summary}
                                    rating={movie.rating}
                                    poster={movie.poster}
                                    genres={movie.genres}
                                    flag={false}
                                    docID={movie.docID}
                                    onDelete={() => handleDelete(movie.docID)}
                                    state={false}
                                />
                                {/*<button onClick={() => handleDelete(movie.docID )}>Удалить</button> /!* Кнопка удаления *!/*/}
                            </div>
                        ))
                    ) : (
                        <p>У вас нет добавленных фильмов.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;