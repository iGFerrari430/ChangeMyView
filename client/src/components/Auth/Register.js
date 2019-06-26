import React from 'react'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            email: '',
            password1: '',
            password2: ''
        }
    }

    onNameChange = (e) => {
        const userName = e.target.value;
        this.setState(() => ({ userName }));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onpassword1Change = (e) => {
        const password1 = e.target.value;
        this.setState(() => ({ password1 }));
    }

    onpassword2Change = (e) => {
        const password2 = e.target.value;
        this.setState(() => ({ password2 }));
    }


    onSubmit = e => {
        e.preventDefault();
        console.log("Hello, World!");  
        console.log(this.state);
    }
    render() {
        return (
            <div className="container center_div">
                <div className="row">
                    <div className="col-0"></div>
                    <div className="col-12">
                    <h1 className="AuthTitle">Create your CMV Account</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className = "form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input 
                                type="text" 
                                className="form-control " 
                                id="exampleInputName" 
                                value={this.state.userName} 
                                onChange={this.onNameChange} 
                                aria-describedby="nameHelp" 
                                placeholder="Enter email" 
                                required/>
                            <small id="nameHelp" className="form-text text-muted">This name will be displayed to other users :) </small>
                        </div>
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
                            value={this.state.password1}
                            onChange={this.onpassword1Change}
                            placeholder="Password" 
                            required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password2">Confirm Password</label>
                            <input type="password" 
                            className="form-control " 
                            id="Password2" 
                            value={this.state.password2}
                            onChange={this.onpassword2Change}
                            placeholder="Password" 
                            required/>
                        </div>

                        <button onSubmit={this.onSubmit} className="btn btn-success">Submit</button>
                    </form>
                    </div>
                </div>

            </div>

        );
    }
}