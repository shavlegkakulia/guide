import React, { Component } from 'react';
import Navigation from './navigation';
import userService from './services/userInfoService';
import stateService from './services/stateService';
import { states } from './models/states';
import authService from './services/authService';
import history from './router/history';

class Main extends Component {
    state = {
        init: false
    }

    componentDidMount() {
        let fn = function() {
            authService.signOut();
            history.push('/login');
        }

        let user = userService.getUserInfo(); 
        let isAuth = authService.isAuthenticated();
        if (!user || !isAuth) {
            fn();
        }
        
        stateService.setState(states.profileInfo, user);
        this.setState({ init: true });

    }

    componentWillUnmount() {
        stateService.clearState(states.profileInfo);
    }

    render() {
        return this.state.init ? <Navigation /> : null
    }
}

export default Main;