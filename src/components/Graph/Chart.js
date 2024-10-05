import React, {useContext, useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {collection, getDocs} from "firebase/firestore";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import './Graph.css'

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
    const [movies, setMovies] = useState([]);
    const { firestore } = useContext(Context);
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

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


    const chartData = {
        labels: movies.map(d => d.title),
        datasets: [{
            label: 'Reviews',
            data: movies.map(d => d.rating),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Movie Reviews',
            },
        },
    };

    return <div className='container--graph'>
        {
            movies.length >0
            ?
                (
                    <Bar data={chartData} options={options} />
                )
                :
                (
                    <p>У вас нет добавленных фильмов.</p>
                )
        }

    </div>;
};

export default ChartComponent;