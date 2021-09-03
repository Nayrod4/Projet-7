import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import HeaderUser from "./Components/Header/HeaderUser"
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Alert from "./Components/Alert/Alert";
import UserRoute from "./Components/UserRoute";
import {initialAuth, AuthReducer} from "./utils/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logo from './images/icon-left-font-monochrome-black.svg';

export const AuthContext = React.createContext()

function App() {

    const [AuthState, dispatchAuthState] = React.useReducer(AuthReducer, initialAuth)

    let routes

    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    if (AuthState.isAuthenticated) {
    routes = (
        <Router>
            <div className="App">
                <HeaderUser title={title}/>
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <Route path="/home" exact={true}>
                            <Home showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <UserRoute path="/home" component={Home} />
                    </Switch>
                    <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
                </div>
            </div>
        </Router>
    );} else {
		routes = (
			<Router>
                <Header title={title}/>
                <Switch>
                <Route path="/">
                    <Card className="text-center" style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Vous souhaite la bienvenue sur son réseau social intranet !</Card.Title>
                            <Card.Text>
                            Alors ? Pret a partager votre journée ?
                            </Card.Text>
                                <Route path="/main"><Button href="/login" variant="outline-dark">Se connecter</Button></Route>
                                <Route path="/main"><Button href="/register" variant="outline-dark">S'enregistrer</Button></Route>
                        </Card.Body>
                        </Card>
                        <UserRoute path="/home" component={Home} />
                </Route>
                </Switch>        
                <div className="container d-flex align-items-center flex-column">
				<Switch>
                <Route path="/register">
                            <Register showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <Route path="/login">
                            <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
				</Switch>
                </div>
			</Router>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				AuthState,
				dispatchAuthState,
			}}
		>
			{routes}
		</AuthContext.Provider>
	)
}    
export default App;

