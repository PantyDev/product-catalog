import React, { useState, useContext } from 'react';
import { auth } from "../../firebase";
import {  Redirect } from "react-router";
import { AuthContext } from "../../Auth.js";
import { MyButton } from '../UI/Button/MyButton';
import { MyInput } from '../UI/Input/MyInput';
import { useEffect } from 'react';

const Login = ({history}) => {

    const [authData, setAuthData] = useState({email: "", password: ""});
    const [errorResponse, setErrorResponse] = useState("");



    useEffect(() => {
        let mounted = true;

        return () => mounted = false;
    }, [errorResponse])


    const signUpAccount = async (e) => {
        auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .catch(err => { 
                switch(err.code)
                {
                    case "auth/invalid-email": setErrorResponse("Неверный эмейл")
                        break;
                    case "auth/wrong-password": setErrorResponse("Неверный пароль") 
                        break;
                    case "auth/internal-error": setErrorResponse("Внутренняя ошибка") 
                        break;
                    default: setErrorResponse(err.code)
                        break;
                } });
        
    }
    const signInAccount = async (e) => {
        e.preventDefault();
        
        try {
            auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .catch(err => {  
                switch(err.code)
                {
                    case "auth/invalid-email": setErrorResponse("Неверный эмейл")
                        break;
                    case "auth/wrong-password": setErrorResponse("Неверный пароль") 
                        break;
                    case "auth/internal-error": setErrorResponse("Внутренняя ошибка") 
                        break;
                    default: setErrorResponse(err.code)
                        break;
                }  });
            
        } catch (error) {
        }
    }


    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
      return <Redirect to="/" />;
    }

    return (
        <div style={{position: "absolute", top: "50%", left: "25%"}}>
        <span>Email:</span>
            <MyInput 
                value={authData.email}
                onChange={ e => setAuthData({...authData, email: e.target.value }) }
                type="text"
                placeholder="test@mail.com" 
            />
            <span>Password:</span>
            <MyInput 
                value={auth.password}
                onChange={ e => setAuthData({...authData, password: e.target.value }) }
                type="password"
            />
            <MyButton onClick={signInAccount}>Войти</MyButton>
            <MyButton onClick={signUpAccount}>Зарегистрироваться</MyButton>
            {errorResponse}
        </div>
    )
}

export default Login
