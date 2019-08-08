import React from 'react';
import SearchPage from './components/Search/SearchPage'
import Profile from './components/UserInfo/Profile'
import InNav from './components/layout/InNav'
import OutNav from './components/layout/OutNav'
import Register from './components/Auth/Register'
import TopicDetail from './components/Topic/TopicDetail'
// eslint-disable-next-line
import Login from './components/Auth/Login'
// eslint-disable-next-line
import Landing from './components/layout/Landing'
import EditArgumentProp from './components/Topic/EditArgumentProp'
// eslint-disable-next-line
import { Router,BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink
import EditTopic from './components/Topic/EditTopic';
import getStore from "./store/store";
import {Provider} from "react-redux";
import './styles/App.css'
import { connect } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import Particles from 'reactparticles.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const {store,persistor} = getStore();

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dummy: false,
            isLoggedin: false,
            showModal: true,

        }

        store.subscribe(() => {
            this.setState(() => ({
                isLoggedin: store.getState().auth.isLoggedin
            }))
        });
        
    }

    componentDidMount() {
        this.setState(() => ({
            dummy: !this.state.dummy
        }))
    }

    componentWillMount() {
        this.setState(() => ({
            dummy: false
        }))
    }

    handleClose = () => {
        this.setState(() => ({
            showModal: false
        }))
    }
    renderDummy = () => {
        return (
            <div>
                <Modal
                show={this.state.showModal}
                centered
                >
                    <Modal.Header>
                        <Modal.Title>Action Needed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        We've detected you have view history of this post.<br/> 
                        Would you like to reload from last times' progress?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Retrieve
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Start Over
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    render() {
        return (
        <div className="AppClass">
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
                                <Route exact path="/topic" component={EditTopic} />
                                <Route exact path="/viewTopic/:topicId" component={TopicDetail}/>
                                <Route exact path="/EditArgumentProp/:topicId/:userStand" component={EditArgumentProp} />
                                <Route exact path="/Search/:keyword" component={SearchPage} />
                                <Route exact path="/Profile/:userName" component={Profile} />
                            </Switch>        
                        </div>
                    </BrowserRouter>
                </PersistGate>
            
            </Provider>
            <br/>
            
        </div>
        

        );
    }
}


