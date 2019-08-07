import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser,hashCode,logoutUser} from "../../actions/authActions"

class OutNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummy: null
        };
    }


    onLogOut = () => {
        logoutUser(this.props.dispatch);
        this.props.history.push("/");
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm row bg-light" style={{backgroundColor: ""}}>
                <div className="col-sm-4">
                    <NavLink to="/" className="navbar-brand"><i className="far fa-paper-plane"></i></NavLink>
                    <NavLink to="/" className="navbar-brand">ChangeMyView</NavLink>
                </div>
                

                <form className="form-inline col-sm-4">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                 </form>

                 <div className="col-sm-4 rightAlign ">
                 {
                     /*
                    <span className="navbar-text Txt">
                    Welcome, {this.props.auth.user.userName}!
                    </span>*/
                 }

                    <Link to="/signup"><button className="btn btn-outline-info">{this.props.auth.user.userName}</button></Link>
                    <button className="btn btn-outline-info" onClick={this.onLogOut}>Log Out</button>
                 </div>


                 
            </nav>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(OutNav);