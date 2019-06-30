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
import EditTopic from './components/Topic/EditTopic';
import './styles/App.css'
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
            <BrowserRouter>
                <div className = "container.fluid">
                    {this.state.user? <OutNav/> : <InNav/>}
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/topic/:uId" component={EditTopic} />
                    </Switch>

                    
                </div>
            </BrowserRouter>
        </div>
        

        );
    }
}