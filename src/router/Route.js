import React, { Component } from 'react';
import authService from '../services/authService';
import { Route, Redirect } from 'react-router-dom';
import model from '../models/routes';

class NoAuthRoute extends Component {

    render() {
        return (authService.isAuthenticated() ? <Route {...this.props} /> : <Redirect to={model.login} />)
    }
}

export default NoAuthRoute;