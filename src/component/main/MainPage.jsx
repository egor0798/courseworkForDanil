import React, { Component } from 'react';
import {withCookies} from "react-cookie"
import {getConnections, getUserId} from "../../api/websocket-api";
import WSConnectionHandler from "./WSConnectionHandler";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import store from "../../store";
import {Button} from "semantic-ui-react";
import {setTablesData} from "../../action/database-action";


class MainPage extends Component{
    constructor(props){
        super(props);
        this.child = React.createRef();
        getConnections(this.props.cookies.get("session_username"), this.props.cookies.get("session_password"));
        getUserId();
        this.click = this.click.bind(this);
    }

    componentDidMount(){
        if (!this.props.cookies.get('session_username'))
            this.props.history.push('/login');
        store.subscribe(() => this.forceUpdate());
    }

    createTableHeaders = () => {
        if (this.props.tables[this.props.active_table])
            return this.props.tables[this.props.active_table].columns.map( (item) => {
                return <th>{item.name}</th>
            });
    };

    onRowDelete = (e) => {
        this.child.sendQuery(this.props.tables[this.props.active_table].name,e.target.name);
        this.props.tables_data[this.props.active_table].data.splice(e.target.id,1);
        store.dispatch(setTablesData(this.props.tables_data));
    };

    createTableContent = () => {
        if (this.props.tables_data[this.props.active_table]) {
            let i = -1;
            return this.props.tables_data[this.props.active_table].data.map( (data) => {
                i++;
                return <tr>
                    {data.map((item) => {
                        return <td>{item}</td>
                    })}
                    <Button name={data[0]} id={i}  onClick={this.onRowDelete}>Delete</Button>
                </tr>
            });
        }
    };

    getTableName = () => {
        if (this.props.tables[this.props.active_table])
            return this.props.tables[this.props.active_table].name;
    };


    click(){
        debugger;
    };

    render(){
        return(
            <div>
                <Button primary onClick={this.click}>Debug</Button>
                <WSConnectionHandler onRef={ref => (this.child = ref)} connection_id={this.props.active_db} user_id={this.props.user_id} password={this.props.cookies.get("session_password")}/>
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

export default withRouter(withCookies(connect(mapStateToProps)(MainPage)));