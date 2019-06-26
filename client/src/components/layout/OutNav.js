import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

export default class OutNav extends React.Component {
    state = {
        dummy: null
    };

    render() {
        return (
            <nav className="navbar navbar-expand-sm row bg-light" style={{backgroundColor: ""}}>
                <div className="col-sm-4">
                    <NavLink to="/" className="navbar-brand"><i class="far fa-paper-plane"></i></NavLink>
                    <NavLink to="/" className="navbar-brand">ChangeMyView</NavLink>
                </div>
                

                <form className="form-inline col-sm-4">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                 </form>

                 <div className="col-sm-4 rightAlign ">
                    <span className="navbar-text Txt">
                        Welcome, foo!
                    </span>
                    <Link to="/signup"><button className="btn btn-outline-info">Dashboard</button></Link>
                    <Link to="/login"><button className="btn btn-outline-info">Log Out</button></Link>
                 </div>


                 
            </nav>
        );
    }
}