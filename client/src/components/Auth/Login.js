import React from 'react'
import axios from 'axios'
import {loginUser,hashCode} from "../../actions/authActions";
import { connect } from 'react-redux';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMsg: ''
        }
    }

    onEmailChange = e => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onpasswordChange = e => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }


    onSubmit = async e => {
        e.preventDefault();
        let {email,password} = this.state;
        email = email.trim();
        password = hashCode(password.trim()).toString();
        const body = {email,password};
        const LoginMsg = await loginUser(body,this.props.dispatch);
        try{
            if (LoginMsg === "SUCCESS"){
                this.setState(() => ({
                    errorMsg: ''
                }))
                this.props.history.push('/');
            }else{
                this.setState(() => ({
                    errorMsg: LoginMsg
                }))
            }
        }catch(err){
            console.log(err);
        }


    }
    render() {
        return (
            <div className="container center_div">
                <div className="row">
                    <div className="col-0"></div>
                    <div className="col-12">
                    <h1 className="AuthTitle">Logging in</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input 
                                    type="email" 
                                    className="form-control " 
                                    value={this.state.email}
                                    onChange={this.onEmailChange}
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email"
                                     required/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password1">Password</label>
                            <input type="password" 
                            className="form-control " 
                            id="Password1" 
                            value={this.state.password}
                            onChange={this.onpasswordChange}
                            placeholder="Password" 
                            required/>
                        </div>
                        {
                            this.state.errorMsg && <div className="alert alert-warning" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                        <button onSubmit={this.onSubmit} className="btn btn-primary">Log in</button>
                    </form>
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Login);