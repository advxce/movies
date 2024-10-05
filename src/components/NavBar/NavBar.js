import React, { useContext } from 'react';
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation } from "react-router-dom";
import {
    AppBar, Box, Button, Divider, Toolbar, Typography,
} from "@mui/material";
import "./NavBar.css";

function NavBar(props) {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const logOut = () => {
        auth.signOut();
    };

    const location = useLocation(); // Получаем текущий путь

    return (
        user ? (
            <Box width="99%">
                <AppBar className="nav--container" position='static'>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            «Агрегатор реценция по фильмам “FilmsWiki”»
                        </Typography>
                        <Box className='box--nav' sx={{
                            flexGrow: 20,
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderColor: 'divider',
                        }}>
                            <Divider sx={{ borderColor: 'white' }} orientation="vertical" variant="middle" flexItem />
                            <Link className={`link ${location.pathname === '/' ? 'active' : ''}`} to='/'>MY FILMS</Link>
                            <Divider sx={{ borderColor: 'white' }} orientation="vertical" variant="middle" flexItem />
                            <Link className={`link ${location.pathname === '/movies' ? 'active' : ''}`} to='/movies'>MOVIES</Link>
                            <Divider sx={{ borderColor: 'white' }} orientation="vertical" variant="middle" flexItem />
                            <Link className={`link ${location.pathname === '/graph' ? 'active' : ''}`} to='/graph'>GRAPH</Link>
                            <Divider sx={{ borderColor: 'white' }} orientation="vertical" variant="middle" flexItem />
                        </Box>
                        <Button color="inherit" className="nav--btn" onClick={logOut}>LogOut</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        ) : (
            <div className='nav--window'>
                <div>
                    WELCOME TO MY WEB-APP!
                </div>
            </div>
        )
    );
}

export default NavBar;