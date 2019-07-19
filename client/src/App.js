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
import {PersistGate} from 'redux-persist/integration/react'
const {store,persistor} = getStore();
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dummy: false,
            isLoggedin: false
            //render={(props) => <EditTopic {...props} isAuthed={true} />
            //
        }

        console.log("Inspect store: ",store.getState());
        store.subscribe(() => {
            console.log("娃子东西");
            this.setState(() => ({
                isLoggedin: store.getState().auth.isLoggedin
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
        //console.log("check store user: "+store.getState().auth.isLoggedin);
        return (
        <div>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
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
                </PersistGate>
            
            </Provider>
            
        </div>
        

        );
    }
}


