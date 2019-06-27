import React from 'react'

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    }

    onpasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
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

                        <button onSubmit={this.onSubmit} className="btn btn-primary">Log in</button>
                    </form>
                    </div>
                </div>

            </div>

        );
    }
}