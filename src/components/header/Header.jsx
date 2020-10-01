import React from 'react';

import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { logout } from '../../firebase/firebase.utils';

import { useSelector } from 'react-redux';

// <Nav className="mr-auto" defaultActiveKey="/home" as="ul">
// <Nav.Link href='mainpage'>Welcome to Movies-Subscriptions</Nav.Link>
// </Nav>
// <Nav className="mr-auto"  as="li">
// <Nav.Link href='movies'>Movies</Nav.Link>
// </Nav>
// <Nav className="mr-auto"  as="li">
// <Nav.Link href='subscriptions'>Subscriptions</Nav.Link>
// </Nav>

//                 <Navbar.Brand href='mainpage'></Navbar.Brand>

const Header = ({ loggedIn }) => {

    const user = useSelector( state => state.user.currentUser )

    return (
        <div>
            <header>
                <Navbar fixed="top" expand="lg" variant="dark" bg="dark">
                <Navbar.Brand style={{fontWeight: "bold", color: "orange", fontSize: "12px"}}>{loggedIn ? ((user)? user.displayName: null) : "User" }</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    {
                        (user)?
                        (
                            <Nav className="mr-auto" defaultActiveKey="mainpage" as="ul">
                                <Nav.Item  as="li">
                                    <NavLink to='mainpage' className="nav-link" activeClassName="selected" 
                                        activeStyle={{fontWeight: "bold"}}>
                                        Home
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <NavLink to='movies' className="nav-link" activeClassName="selected" 
                                        activeStyle={{fontWeight: "bold"}}>
                                        Movies
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <NavLink to='subscriptions' className="nav-link" activeClassName="selected" 
                                            activeStyle={{fontWeight: "bold"}}>
                                        Subscription
                                    </NavLink>
                                </Nav.Item>
                                {
                                    (user.userName === 'admin') ?
                                    (  
                                        <Nav.Item as="li">
                                            <NavLink to='manageusers' className="nav-link" activeClassName="selected" 
                                                activeStyle={{fontWeight: "bold"}} >
                                                Users Management
                                            </NavLink>
                                        </Nav.Item>
                                    ) : null
                                  
                                }
                            </Nav>

                        ) : 
                        (
                            (
                                <Nav className="mr-auto" defaultActiveKey="signin" as="ul">
                                    <Nav.Item  as="li">
                                        <NavLink to='signin' className="nav-link" activeClassName="selected" 
                                            activeStyle={{fontWeight: "bold"}}>
                                            Home
                                        </NavLink>
                                    </Nav.Item>
                                </Nav>
                            )
                        )
                    }
                   

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