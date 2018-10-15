import React, { Component } from 'react';
import {Button} from "semantic-ui-react";
import store from "../../store";
import {clearAllTables, setTables, setTablesData} from "../../action/database-action";
import {withCookies} from "react-cookie";
import connect from "react-redux/es/connect/connect";


let socket = new WebSocket('ws://localhost:9000/ws');
class WSConnectionHandler extends Component{
    constructor(props){
        super(props);

        this.state = {
            last_table:'',
            prev_con:this.props.connection_id
        };

        socket.onclose = (event) => {
            console.log('Code: ' + event.code + ' причина: ' + event.reason);
        };
        socket.onmessage = (event) => {
            if(event.data.startsWith('{')) {
                this.parseSocketMessage(event.data);
            }
            else {
                if (event.data.startsWith('Hello! You need to authorize.'))
                    this.getAllTableNames();
            }

        };

        socket.onerror = (error) => {
            console.log("Error: " + error.message);
        };
        this.click = this.click.bind(this);
        this.getAllTabelsData = this.getAllTabelsData.bind(this);
        this.getAllTableNames = this.getAllTableNames.bind(this);
        this.parseSocketMessage = this.parseSocketMessage.bind(this);
    }

    parseSocketMessage(data){
        let parsed = JSON.parse(data);
        if(data.startsWith('{"tables"')){
            store.dispatch(setTables(parsed.tables));
            this.getAllTabelsData(parsed.tables);
        }
        else {
            let new_data = [];
            new_data = this.props.tables_data;
            new_data.push({
                table_name: this.state.last_table,
                data: parsed.objs
            });
            store.dispatch(setTablesData(new_data));
        }
    };

    reconnect = () =>{
        this.state = {
            last_table:''
        };
        store.dispatch(clearAllTables());
        socket = new WebSocket('ws://localhost:9000/ws');
        socket.onclose = (event) => {
            console.log('Code: ' + event.code + ' причина: ' + event.reason);
        };
        socket.onmessage = (event) => {
            console.log(event.data);
            if(event.data.startsWith('{'))
                this.parseSocketMessage(event.data);
            else {
                if (event.data.startsWith('Hello! You need to authorize.')){
                    this.getAllTableNames();
                }
            }

        };

        socket.onerror = (error) => {
            console.log("Error: " + error.message);
        };
    };

    getAllTableNames(){
        this.state = {
            last_table:''
        };
        let con_data = JSON.stringify({
            "connection_id": this.props.connection_id,
            "user_id": this.props.user_id,
            "password": this.props.password
        });
        if(socket.readyState === socket.OPEN) {
            socket.send(con_data);
            this.getAllTabelsData();
        }
    };

    getAllTabelsData(){
        this.props.tables.forEach(  (item, i, arr) => {
            this.setState({last_table : item.name});
            let query_data = JSON.stringify({
                "query": "SELECT * FROM " + item.name
            });
            socket.send(query_data);
        })
    };



    click(){
        debugger;
    };


    render(){
        if(this.state.prev_con != this.props.connection_id){
            this.setState({prev_con: this.props.connection_id});
            this.reconnect();
        }
        return(
            <div>
                <p style={{display:"hidden"}}>Connecion: {this.props.connection_id}</p>
                <Button secondary onClick={this.click}>DEB</Button>
            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return {
        tables: store.dbState.tables,
        tables_data: store.dbState.tables_data,
    }
};

export default connect(mapStateToProps)(WSConnectionHandler);