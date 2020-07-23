import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';
import About from './About';
import Login from './Login';
import Profile from './Profile';
import Waste from './Waste';
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav as Bnav } from 'react-bootstrap';


export default function Nav(props) {
    console.log('nav');
    return (
        <Router>

            <div>
                <nav>
                    <div>
                        <Navbar bg="light" expand="lg">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Bnav className="mr-auto">
                                    <Bnav.Link href="/">Home</Bnav.Link>
                                    <Bnav.Link href="/waste">Log waste</Bnav.Link>
                                    <Bnav.Link href="/about">About</Bnav.Link>
                                </Bnav>
                                <Bnav className="ml-auto">
                                    <Bnav.Link href="/login">Login</Bnav.Link>
                                    <Bnav.Link href="/profile">Profile</Bnav.Link>
                                </Bnav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </nav>
            </div>

            <Switch>
                <Route exact path='/about'>
                    <About />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/profile'>
                    <Profile />
                </Route>
                <Route exact path='/waste'>
                    <Waste userCookie={props.userCookie} />
                </Route>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}