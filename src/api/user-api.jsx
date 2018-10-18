import axios from 'axios';
import store from '../store';
import {setErr,  clearErr} from '../action/error-action';
import {setConnections} from "../action/database-action";
import {setUserId} from "../action/user-action";

export function login_try(login, password, history, cookie) {
    cookie.set('session_username', login, { path: '/' } );
    cookie.set('session_password', password, { path: '/' } );
    return axios.request({
        url: 'http://localhost:9000/user',
        method: "get",
        withCredentials: true,
    })
        .then(response => {
            history.push("/");
            store.dispatch(setUserId(response.data.id))
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
            cookie.remove('session_username');
            cookie.remove('session_password');
            store.dispatch(setErr(error.response.data));
        });
}

export function register(login, password, email, history, cookie) {
    let postData = JSON.stringify({
        username: login,
        password: password,
        email: email
    });
    console.log(postData);
    return axios.post('http://localhost:9000/user', postData,{headers:{'Content-Type': 'application/json',}})
        .then(response => {
            cookie.set('session_username', login, { path: '/' } );
            cookie.set('session_password', password, { path: '/' } );
            store.dispatch(clearErr());
            alert("Note that without email verification your account will be deleted in 24 hours");
            history.push("/");
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
            store.dispatch(setErr("Username already taken"))
        });
}


export function createCon(host, db, user, password, dbms) {
    let postData = {
        host: host,
        database: db,
        user: user,
        password: password,
        dbms: dbms
    };
    return axios.request({
        url: "http://localhost:9000/connection",
        method: "post",
        withCredentials: true,
        data:postData
        })
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
        });
}