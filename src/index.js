import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Home from './components/Home';
import Setting from './components/Setting';
import { Router, Route, hashHistory } from 'react-router';
import './index.css';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Login} router={Router}></Route>
        <Route path="/home" component={Home} router={Router}></Route>
        <Route path="/setting" component={Setting} router={Router}></Route>
    </Router>,
    document.getElementById('root')
);
