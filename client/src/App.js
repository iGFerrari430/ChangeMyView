import React from 'react';
import Header from './components/layout/Header'
import Landing from './components/layout/Landing'
export default class App extends React.Component {
    state = {
        dummy: null
    }

    render() {
        return (
            <div>
                <Header/>
                <Landing/>
            </div>
        );
    }
}