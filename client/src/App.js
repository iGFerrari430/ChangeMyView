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
    /* Topic Format: 
        {
            title: string,
            content: string,
            hotness: number
        }
    */
    constructor(props) {
        super(props);
        
        let dummyTopic = {
            title: "My Name is Yinfei Wang",
            content:" I am from University of Harbin buddism!",
            hotness: 100
        };

        let dummyList = [];
        dummyList.push(dummyTopic);
        this.state = {
            user: null,
            TopicList: dummyList
        }
    }

    render() {
        return (
        <BrowserRouter>
            <div className = "container.fluid">
                {this.state.user? <OutNav/> : <InNav/>}
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Landing} />
                </Switch>

                
            </div>
        </BrowserRouter>

        );
    }
}