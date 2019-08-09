import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser,hashCode,logoutUser} from "../../actions/authActions"
import SearchBar from "../Search/SearchBar"
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
                
                <div className="col-sm-3">
                    <SearchBar/>
                </div>
                

                 <div className="col-sm-5 rightAlign ">
                    <Link to={"/Profile/"+this.props.auth.user.userName}><button className="btn btn-outline-info">{this.props.auth.user.userName}</button></Link>
                    <button className="ml-2 btn btn-outline-info" onClick={this.onLogOut}>Log Out</button>
                 </div>


                 
            </nav>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(OutNav);