import React, {useContext} from 'react';
import {useLocation} from "react-router-dom";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {addDoc, collection} from "firebase/firestore";
import {Button, Rating, Typography} from "@mui/material";
import './Details.css'
import AddIcon from "@mui/icons-material/Add";

function Details() {
    const location = useLocation();


    console.log(location)

    const {firestore} = useContext(Context)
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const addMovie = async () => {
        try {
            const moviesCollection = collection(firestore, `${user.email}_movies`); // Получение ссылки на коллекцию
            await addDoc(moviesCollection, {
                id: location.state.id,
                year: location.state.year,
                title: location.state.title,
                summary: location.state.summary,
                rating: location.state.rating,
                poster: location.state.poster,
                genres: location.state.genres,
                largePoster: location.state.largePoster
            });
            console.log('Фильм добавлен!');
        } catch (error) {
            console.error('Ошибка при добавлении фильма:', error);
        }
    };

    if (!location) {
        return <div>Error: Location not found!</div>;
    }
    return (
        <div className='detail--container'>
            <div className='detail--constructor'>


                <img width='25%' src={location.state.poster} alt={location.state.title}/>
                <div className='detail-column-container'>
                    <h2>{location.state.title}</h2>
                    <h3>Year of issue: {location.state.year}</h3>
                    <div className='li--container'>
                        <div className='detail--l' >Roles: </div>
                        <ul className="movie__genres">
                            {location.state.genres.map((genre, index) => (
                                index === 0 ? (
                                    <li key={index}>
                                        <div className='detail--li'>{genre}</div>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <div className='detail--li'>/{genre}</div>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    <div>
                        <Typography className='rating' component="legend">Rating</Typography>
                        <Rating name="half-rating-read" defaultValue={location.state.rating / 2} precision={0.5} max={5}
                                readOnly/>
                    </div>


                </div>
            </div>
            <p className='description'>{location.state.summary}</p>
            {location.state.flag && (
                <Button className='movie--btn' variant='contained' size='small' onClick={addMovie}><AddIcon/> Add Movie</Button>
            )}

        </div>
    );
}

export default Details;