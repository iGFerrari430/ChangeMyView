import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import SearchBar from "../Search/SearchBar"

export default class InNav extends React.Component {
    state = {
        dummy: null
    };

    render() {
        return (
            <div className="container.fluid">
            <nav className="navbar navbar-expand-sm row bg-light" style={{backgroundColor: ""}}>
                <div className="col-sm-4">
                    <NavLink to="/" className="navbar-brand"><i className="far fa-paper-plane"></i></NavLink>
                    <NavLink to="/" className="navbar-brand">ChangeMyView</NavLink>
                </div>
                
                <div className="col-sm-3">
                    <SearchBar/>
                </div>
                

                 <div className="col-sm-5 rightAlign ">
                    <Link to="/register"><button className="btn btn-outline-success">Sign up</button></Link>
                    <Link to="/login"><button className="btn btn-outline-primary ml-2">Log in</button></Link>
                 </div>


                 
            </nav>
            </div>
        );
    }
}