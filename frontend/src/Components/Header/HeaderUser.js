import React from 'react';
import { withRouter } from "react-router-dom";
import { Navbar, Nav, } from 'react-bootstrap';

function Header(props) {
    // const capitalize = (s) => {
    //     if (typeof s !== 'string') return ''
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    // }

    const profil = () => {
        window.location.href = '/profil';
    }
    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }
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
        <Navbar.Brand href="/home">Groupomania</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#home"onClick={logout}>Mon profil</Nav.Link>
            <Nav.Link href="#home"onClick={profil}>Se déconnecter</Nav.Link>
        </Nav>
        {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form> */}
    </Navbar>
    )
}
export default withRouter(Header);