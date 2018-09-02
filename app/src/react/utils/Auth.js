import {Base64} from "js-base64";
import {Redirect, Route} from "react-router";
import React from 'react';
import {connect} from "react-redux";

export const sendRequest = async(url, method, body) => {
    const {username, password} = loadData();

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Base64.btoa(username+":"+password)
            },
            body: body
        });
        console.log(response);
        return response;
    }catch(err) {
        console.log(err);
    }
};

export const storeData = (username, password, role) => {
     localStorage.setItem('username', username);
     localStorage.setItem('password', password);
     localStorage.setItem('role', role);
};

export const isAuth = () => {
    return localStorage.getItem('role') === 'ROLE_USER' || localStorage.getItem('role') === 'ROLE_ADMIN';
};

export const loadData = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');
    return {username, password, role};
};

export const login = async(username, password) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + Base64.btoa(username+":"+password)
            }
        });
        console.log(response);
        return response;
    }catch(err) {
        console.log(err);
    }
};

export const logout = () => {
    localStorage.clear();
};

export default (ProtectedRoute) => {
    class AuthHOC extends React.Component {

        render () {
            // Return a Loading component while the isLoading function is 'true'
            if (!this.props.isAuthed) {
                return <Redirect to="/login"/>
            }
            // Pass the received 'props' and created functions to the ProtectedRoute component
            return (
                <ProtectedRoute
                    {...this.props}
                />
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthed: state.auth.role
        }
    };

    return connect(mapStateToProps)(AuthHOC);
};


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuth() ? <Component {...props} /> : <Redirect to='/login' />
    )} />
);