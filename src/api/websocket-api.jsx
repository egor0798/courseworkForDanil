import axios from "axios";
import store from "../store";
import {setActiveDB, setConnections} from "../action/database-action";
import {setUserId} from "../action/user-action";

export function getConnections() {
    return axios.request({
        url: "http://localhost:9000/connections",
        method: "get",
        withCredentials: true})
        .then(response => {
            let ids = [], names = [];
            response.data.map((id) => {
                getConnectionsInfo(id, ids, names);
            });
            store.dispatch(setActiveDB(response.data[0]));
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
        });
}


export function getUserId() {
    return axios.request({
        url: "http://localhost:9000/user",
        method: "get",
        withCredentials: true})
        .then(response => {
            console.log('setting user id');
            store.dispatch(setUserId(response.data.id));
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
        });
}


function getConnectionsInfo(id, ids,names){
    return axios.request({
        url: "http://localhost:9000/connection/" + id,
        method: "get",
        withCredentials: true})
        .then(response => {
            ids.push(id);
            names.push(response.data.database);
            store.dispatch(setConnections({id: ids, names: names}));
        }).catch(error => {
            console.log("ERROR:" + error.toLocaleString());
        });
}