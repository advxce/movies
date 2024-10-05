import React, {useContext} from 'react';
import {Route, Switch, Redirect, Router, Routes} from 'react-router-dom'
import Auth from "../Auth/Auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";
import MovieList from "../Movies/MovieList";
import UserProfile from "../UserProfile/UserProfile";
import Details from "../../Details/Details";
import ChartComponent from "../Graph/Chart";


function AppRouter() {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    console.log(user)

    return (
        user
            ?
            (
                <Routes>
                    <Route path='/' element={<UserProfile/>}/>
                    <Route path='/movies' element={<MovieList/>}/>
                    <Route path='/details' element={<Details/>}/>
                    <Route path='/graph' element={<ChartComponent/>}/>
                </Routes>
            )
            :
            (
                <Routes>
                    <Route path='/' element={<Auth/>}/>
                </Routes>
            )


    )


}

export default AppRouter;