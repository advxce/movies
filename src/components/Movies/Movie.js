import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./Movie.css";
import {Context} from "../../index";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Movie({id, year, title, summary, rating, poster, genres, flag, docID, onDelete, largePoster, state}) {
    const {firestore} = useContext(Context);
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const addMovie = async () => {
        try {
            const moviesCollection = collection(firestore, `${user.email}_movies`);
            const q = query(moviesCollection, where("title", "==", title));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setIsDuplicate(true);
                return;
            }

            await addDoc(moviesCollection, {
                id,
                year,
                title,
                summary,
                rating,
                poster,
                genres,
                largePoster
            });
            console.log('Movie added!');
            setIsDuplicate(false);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <div className="movie">
            <Link className='movie--link' to={"/details"} state={{
                id, year, title, summary, rating, poster, genres, flag, docID, largePoster, state
            }}>
                <img src={poster} alt={title}/>
                <div className="movie__column">
                    <h3 className="movie__title">{title}</h3>
                    <h5 className="movie__year">{year}</h5>
                    <ul className="movie__genres">
                        {genres.map((genre, index) => (
                            <li key={index}>{genre}</li>
                        ))}
                    </ul>
                </div>
                <p className="movie__summary">{summary.slice(0, 140)}...</p>
            </Link>
            {flag ? (
                <>
                    {!isDuplicate ? (
                            <div className='movies--btn'>
                                <Button className='movie--btn' variant='contained' size='small' onClick={addMovie}>
                                    <AddIcon/> Add Movie
                                </Button>

                            </div>
                        )
                        : <div className='movies--btn' >
                            <p style={{color: 'red', display: 'flex', marginTop: '50px'}} className='movie--btn'>This
                                movie is already
                                in your collection!
                            </p>
                        </div>}
                </>


            ) : (
                <div className='movies--btn'>
                    <Button className='movie--btn' variant='contained' size='small' onClick={() => onDelete(docID)}>
                        <DeleteIcon/> Delete Movie
                    </Button>
                </div>
            )}
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;