import React, { Component } from 'react';
import {withCookies} from "react-cookie"
import {getConnections, getUserId} from "../../api/websocket-api";
import WSConnectionHandler from "./WSConnectionHandler";
import {connect} from "react-redux";
import store from "../../store";
import {Button} from "semantic-ui-react";
import {clearAllTables} from "../../action/database-action";


class MainPage extends Component{
    constructor(props){
        super(props);
        getConnections(this.props.cookies.get("session_username"), this.props.cookies.get("session_password"));
        getUserId();

    }

    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    createTableHeaders = () => {
        if (this.props.tables[this.props.active_table])
            return this.props.tables[this.props.active_table].columns.map( (item) => {
                return <th>{item.name}</th>
            });
    };

    createTableContent = () => {
        if (this.props.tables_data[this.props.active_table])
        return this.props.tables_data[this.props.active_table].data.map( (data) => {
            return <tr>
                {data.map((item) => {
                    return <td>{item}</td>
                })
                }
            </tr>
        });
    };

    getTableName = () => {
        if (this.props.tables[this.props.active_table])
            return this.props.tables[this.props.active_table].name;
    };

    click = () => {
        console.log(this.props);
        debugger;
    };

    render(){
        return(
            <div>
                <Button primary onClick={this.click}>Debug</Button>
                <WSConnectionHandler connection_id={this.props.active_db} user_id={this.props.user_id} password={this.props.cookies.get("session_password")}/>
                <div>
                    <h1>Tablename: {this.getTableName()}</h1>
                    <table>
                        <tr>
                            {this.createTableHeaders()}
                        </tr>
                        {this.createTableContent()}

                    </table>
                </div>
            </div>
        );
    }



}


const mapStateToProps = (store) => {
    return {
        tables: store.dbState.tables,
        tables_data: store.dbState.tables_data,
        active_table: store.dbState.active_table,
        active_db: store.dbState.active_db,
        user_id: store.userState.user_id
    }
};

export default withCookies(connect(mapStateToProps)(MainPage));