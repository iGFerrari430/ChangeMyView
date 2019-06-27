import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

export default class InNav extends React.Component {
    state = {
        dummy: null
    };

    render() {
        return (
            <div className="container.fluid">
            <nav className="navbar navbar-expand-sm row bg-light" style={{backgroundColor: ""}}>
                <div className="col-sm-5">
                    <NavLink to="/" className="navbar-brand"><i className="far fa-paper-plane"></i></NavLink>
                    <NavLink to="/" className="navbar-brand">ChangeMyView</NavLink>
                </div>
                

                <form className="form-inline col-sm-5">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                 </form>

                 <div className="col-sm-2 rightAlign ">
                    <Link to="/register"><button className="btn btn-outline-success">Sign up</button></Link>
                    <Link to="/login"><button className="btn btn-outline-primary">Log in</button></Link>
                 </div>


                 
            </nav>
            </div>
        );
    }
}