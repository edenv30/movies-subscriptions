import React from 'react';

import { Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { logout } from '../../firebase/firebase.utils';

import { useSelector } from 'react-redux';


const Header = ({ loggedIn }) => {

    const user = useSelector( state => state.user.currentUser )

    return (
        <div>
            <header>
                <Navbar fixed="top" expand="lg" variant="dark" bg="dark">
                <Navbar.Brand>{loggedIn ? ((user)? user.displayName: null) : "User" }</Navbar.Brand>
                <Navbar.Brand href='mainpage'></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Welcome to Movies-Subscriptions</Nav.Link>
                    </Nav>
                    <Form inline>
                        {
                            loggedIn ?
                            (<div className="btn btn-outline-warning" onClick={ () =>  logout() }>SIGN OUT</div>)
                            :
                            (<Link to='signin' className="btn btn-outline-warning">SIGN IN</Link>)
                        }
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
    )
}
 

export default (Header);

// <FormControl type="text" placeholder="Search" className="mr-sm-2" />
// <Button variant="outline-success">Search</Button>