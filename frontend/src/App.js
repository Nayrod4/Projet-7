import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import MainPage from "./Components/Home/Home";
import Alert from "./Components/Alert/Alert";
import UserRoute from "./Components/UserRoute";

function App() {
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
        <Router>
            <div className="App">
                <Header title={title}/>
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <Route path="/" exact={true}>
                            <Register showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <Route path="/register">
                            <Register showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <Route path="/login">
                            <Login showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <UserRoute path="/home" component={MainPage} />
                    </Switch>
                    <Alert errorMessage={errorMessage} hideError={updateErrorMessage}/>
                </div>
            </div>
        </Router>
    );
}

export default App;