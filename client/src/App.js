import React from 'react';
import InNav from './components/layout/InNav'
import OutNav from './components/layout/OutNav'
import Register from './components/Auth/Register'
import TopicDetail from './components/Topic/TopicDetail'
// eslint-disable-next-line
import Login from './components/Auth/Login'
// eslint-disable-next-line
import Landing from './components/layout/Landing'
// eslint-disable-next-line
import { Router,BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink
import EditTopic from './components/Topic/EditTopic';
import getStore from "./store/store";
import {Provider} from "react-redux";
import './styles/App.css'
import { connect } from 'react-redux';

const store = getStore();
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dummy: false,
            isLoggedin: false
            //render={(props) => <EditTopic {...props} isAuthed={true} />
            //
        }

        
        store.subscribe(() => {
            console.log("娃子东西");
            this.setState(() => ({
                isLoggedin: true
            }))
            console.log("get here!");
        });
        
    }

    componentDidMount() {
        console.log("Did Mount!");
        this.setState(() => ({
            dummy: !this.state.dummy
        }))
    }

    componentWillMount() {
        console.log("Will Mount!");
        this.setState(() => ({
            dummy: false
        }))
    }

    render() {
        console.log("check store user: "+store.getState().auth.isLoggedin);
        return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <div className = "container.fluid">
                    <Route
                    path="/"
                    component={
                      store.getState().auth.isLoggedin ? OutNav : InNav
                    }
                  />
                        <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/topic/:uId" component={EditTopic} />
                            <Route exact path="/viewTopic/:topicId" component={TopicDetail}/>
                        </Switch>

                        
                    </div>
                </BrowserRouter>
            </Provider>
            
        </div>
        

        );
    }
}


