import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { Button, Rating, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import './Details.css';

function Details() {
    const location = useLocation();
    const { firestore } = useContext(Context);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const fetchComments = async () => {
        const commentsCollection = collection(firestore, `movies/${location.state.id}/comments`);
        const q = query(commentsCollection, orderBy("timestamp"));
        const querySnapshot = await getDocs(q);
        const commentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsList);
    };

    useEffect(() => {
        fetchComments();
    }, [firestore, location.state.id]);

    const addComment = async () => {
        if (!user || !commentText.trim()) return; // Проверка, что пользователь авторизован и текст комментария не пустой

        try {
            const commentsCollection = collection(firestore, `movies/${location.state.id}/comments`);
            await addDoc(commentsCollection, {
                userId: user.uid,
                userName: user.displayName || "Anonymous",
                commentText,
                timestamp: new Date(),
            });
            setCommentText("");
            fetchComments();

            console.log(location.state)
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
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
                        <div className='detail--l'>Roles:</div>
                        <ul className="movie__genres">
                            {location.state.genres.map((genre, index) => (
                                <li key={index}>
                                    <div className='detail--li'>{genre}</div>
                                </li>
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
            <h2>Reviews</h2>
            <div className="comment-section">

                <TextField
                    label="Add a comment"
                    multiline
                    rows={2}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button onClick={addComment} startIcon={<AddIcon/>}>Submit</Button>
            </div>

            <div className="comments">
                {comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <strong>{comment.userName}</strong>: {comment.commentText}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Details;