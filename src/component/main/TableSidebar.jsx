import React, { Component } from 'react'
import {Button, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import {connect} from "react-redux";

import MainPage from "./MainPage";
import store from "../../store";
import './TabSidebar.css'
import {setActiveTable} from "../../action/database-action";
class TableSidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    }

    componentDidMount(){
        store.subscribe(()=>this.forceUpdate());
    }


    handleButtonClick = () => this.setState({ visible: !this.state.visible});

    onTableButtonClick = (e) => {
        store.dispatch(setActiveTable(e.target.id));
    };

    renderTableNames = () => {
        if(this.props.tables)
            return this.props.tables.map((item, i, arr) => {
                    return <Menu.Item style={i==this.props.active_table ? {background:"red"}:{background:"#1b1c1d"}} >
                        <Button id={i} onClick={this.onTableButtonClick}>{item.name}</Button>
                    </Menu.Item>;
            })
    };

    handleSidebarHide = () => this.setState({ visible: false });

    render() {

        const { visible } = this.state;

        return (
            <div style={{height:'100%'}}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        vertical
                        onHide={this.handleSidebarHide}
                        direction='right'
                        inverted
                        visible={visible}
                        width='wide'
                    >
                        <Menu inverted vertical>
                            {this.renderTableNames()}
                        </Menu>

                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Button circular icon id={"menuButton"} onClick={this.handleButtonClick}> <Icon name='arrow alternate circle left' /> </Button>
                            <MainPage/>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        tables: store.dbState.tables,
        active_table: store.dbState.active_table
    }
};

export default connect(mapStateToProps)(TableSidebar);

