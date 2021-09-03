import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';
import jwt from 'jwt-decode'
import { withRouter } from "react-router-dom";
import {API_BASE_URL} from "../Constants/apiConstants.js";

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        // const payload={
        //     "username":state.email,
        //     "password":state.password,
        // }
        
        axios({
            method: 'post',
            url: API_BASE_URL+'/users/login',
            data: {
              email: state.email,
              password: state.password
            }
          })
            .then(function (response) {
                if(response.status === 201){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Connection avec succés. Redirection à l\'accueil..'
                    }))
                    localStorage.setItem("token", response.data['token']);
                    console.log(localStorage.getItem("token"));
                    const decoded = jwt(localStorage.getItem('token'));
                    localStorage.setItem("roles", decoded['roles']);
                    console.log(localStorage.getItem('roles'));
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.data.code === 204){
                    props.showError("Le pseudo et le mot de passe ne correspondent pas");
                }
                else{
                    props.showError("Le pseudo n'existe pas");
                    console.log("Code is "+response.status);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }   
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form className="text-center">
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Adresse Email</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Entrer votre adresse mail ici"
                           value={state.email}
                           onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Groupoma ne partage pas l'email de ses employès</small>
                </div>
                <br/>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Mot de passe</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Entrer votre mot de passe ici"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleSubmitClick}
                >Connection</button>
            </form>
            
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Vous n'avez pas encore de compte ? </span>
                <br />
                <span className="loginText" onClick={() => redirectToRegister()}>En créer un !</span>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);