import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import AppRouter from "./components/AppRouter/AppRouter";

const App = () => {

    return (
        <Router>
            <div className="main">
                <NavBar/>
                <AppRouter/>
            </div>

        </Router>
    );
};

export default App;