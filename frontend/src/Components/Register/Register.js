import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';
import { withRouter } from "react-router-dom";
import {API_BASE_URL} from "../Constants/apiConstants.js";

function Register(props) {
    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.username.length && state.password.length ) {
            props.showError(null);
            const payload={
                "email":state.email,
                "username":state.username,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'users/register', state.email, state.username, state.password)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Enregistrement avec succés ! Retour à la page d\'accueil..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Une Erreur S'est Produite, Veuillez Réessayer Plus Tard");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Veuillez entrer un mot de passe ainsi qu\'un pseudo valide')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Les mots de passe saisis ne correspondent pas');
        }
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
                <br />
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUsername">Pseudo</label>
                    <input type="username"
                           className="form-control"
                           id="username"
                           placeholder="Entrer votre pseudo ici"
                           value={state.username}
                           onChange={handleChange}
                    />
                </div>
                <br />
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
                <br />
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirmation du mot de passe</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirmer votre mot de passe ici"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <br />
                <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={handleSubmitClick}
                >
                    Créer mon compte
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Avez-vous déjà un compte ?</span>
                <br />
                <span className="loginText" onClick={() => redirectToLogin()}>Connectez-vous ici</span>
            </div>

        </div>
    )
}

export default withRouter(Register);