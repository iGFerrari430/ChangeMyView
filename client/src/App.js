import React from 'react';
import InNav from './components/layout/InNav'
import OutNav from './components/layout/OutNav'
import Register from './components/Auth/Register'
// eslint-disable-next-line
import Login from './components/Auth/Login'
// eslint-disable-next-line
import Landing from './components/layout/Landing'
// eslint-disable-next-line
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink

import './App.css'
export default class App extends React.Component {
    state = {
        user: null
    }

    render() {
        return (
        <BrowserRouter>
            <div className = "container.fluid">
                {this.state.user? <OutNav/> : <InNav/>}
                <Switch>
                    <Route path="/register" component={Register} />
                </Switch>

                
            </div>
        </BrowserRouter>

        );
    }
}