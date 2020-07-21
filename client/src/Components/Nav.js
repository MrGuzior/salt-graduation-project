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


export default function Nav(props) {
    console.log('nav');
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/waste'>Log waste</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                    </ul>
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
                    <Waste userCookie={props.userCookie}/>
                </Route>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

