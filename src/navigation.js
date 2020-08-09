import React, { Component } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';
import NoAuthRoute from './router/noAuthRoute';
import Route from './router/Route';
import routes from './models/routes';
import Login from './containers/login/Login';
import TasksContainer from './containers/tasksContainer/tasksContainer';


export default class Navigation extends Component {

    render() {
        return (
                <BrowserRouter>
                    <Switch>
                        <NoAuthRoute path={routes.login} component={Login} />
                        <Route path={routes.default} component={TasksContainer} />
                    </Switch>
                </BrowserRouter>
        );
    }
}