import React, {useContext, useEffect, useState} from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import {Context} from "../../index";
import './Auth.css'
import {Button} from "@mui/material";

const Auth = () => {
    const { auth } = useContext(Context);
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Пользователь вошел:', result.user);
            setPopupVisible(true); // Show popup
            setTimeout(() => setPopupVisible(false), 3000); // Hide after 3 seconds
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    };

    return (
        <div className='auth--container'>
            <Button   variant="contained" size='large' className='auth--btn' onClick={handleLogin}>
                Continue with Google
            </Button>
            {isPopupVisible && (
                <div className="popup">
                    Вы успешно вошли!
                </div>
            )}
        </div>
    );
};

export default Auth;