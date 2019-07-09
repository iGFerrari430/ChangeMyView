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
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink
import EditTopic from './components/Topic/EditTopic';
import getStore from "./store/store";
import {Provider} from "react-redux";
import './styles/App.css'

const store = getStore();
export default class App extends React.Component {
    /* Topic Format: 
        {
            title: string,
            content: string,
            hotness: number
        }
    */
    state = {
        dummy: null

        //render={(props) => <EditTopic {...props} isAuthed={true} />
        //
    }

    render() {
        return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <div className = "container.fluid">
                        {this.state.user? <OutNav/> : <InNav/>}
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