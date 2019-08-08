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
    /*
                <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
    */
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