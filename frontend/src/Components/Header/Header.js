import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, } from 'react-bootstrap';

function Header(props) {
    // const capitalize = (s) => {
    //     if (typeof s !== 'string') return ''
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    // }
    const login = () => {
        window.location.href = '/login';
    }
    const register = () => {
        window.location.href = '/register';
    }
    // const logout = () => {
    //     localStorage.clear();
    //     window.location.href = '/login';
    // }
    // const title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))

    return(
        /*<nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
            </div>
            <div className="text-white">
                <a href="#" onClick={logout}>LOGOUT</a>
            </div>
        </nav>*/
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/main">Groupomania</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home"onClick={register}>S'enregistrer</Nav.Link>
            <Nav.Link href="#" onClick={login}>Se connecter</Nav.Link>
        </Nav>
        {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form> */}
    </Navbar>
    )
}
export default withRouter(Header);