import {Component} from "react";
import {Menu, Dropdown, Modal, Header, Button, Form} from "semantic-ui-react";
import React from "react";
import "./Header.css";
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import store from "../../store";
import {setActiveDB, setActiveTable} from "../../action/database-action";
import {clearErr} from "../../action/error-action";
import {createCon} from "../../api/user-api";
import {withRouter} from "react-router-dom";
import {clearUserId} from "../../action/user-action";

class HeaderBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            host:'localhost',
            db:'',
            user:'',
            password:'',
            dbms:'PostgreSQL',
            open: false,
            open1: false
        };

        this.onSupport = this.onSupport.bind(this);
    }

    componentDidMount(){
        store.dispatch(clearErr());
        store.subscribe(() => this.forceUpdate());
    }

    onLogOut = () =>{
        this.props.cookie.remove('session_username');
        this.props.cookie.remove('session_password');
        this.props.history.push('/login');
        store.dispatch(clearUserId());
    };

    createConnection = () => {
        createCon(this.state.host, this.state.db, this.state.user, this.state.password, this.state.dbms);
        this.setState({open: !this.state.open})
    };

    onChange = (e) =>{
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onModal = () => {
        this.setState({open: !this.state.open});
    };

    handleChange = (e, { name, value }) => {
        store.dispatch(setActiveDB(value));
        store.dispatch(setActiveTable(0));
    };

    onSupport(){
        this.setState({open1: !this.state.open1});
    };



    render(){
        const headerMsg = {
            fontSize:' 20px',
            color:'red'
        };
        const newConnectionModal = () => (
            <Modal open={this.state.open} trigger={<Button onClick={this.onModal}>New connection</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content >
                    <Modal.Description>
                        <Header>Input new connection config</Header>
                        <div style={headerMsg}>{this.props.message}</div>
                        <Form>
                            <Form.Field>
                                <label>Host</label>
                                <input name='host' value={this.state.host} onChange={this.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Database</label>
                                <input name='db' value={this.state.db} onChange={this.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>User</label>
                                <input name='user' value={this.state.user} onChange={this.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input name='password' value={this.state.password} onChange={this.onChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Provider</label>
                                <input name='dbms' value={this.state.dbms} onChange={this.onChange}/>
                            </Form.Field>
                            <Button type='submit' onClick={this.createConnection}>Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );

        const alertModal = () => (
            <Modal open={this.state.open1} trigger={<Menu.Item
                className='navButton'
                name='support'
                as='a'
                onClick={this.onSupport}
            />}>
                <Modal.Header>Нужна помощь?</Modal.Header>
                <Modal.Content >
                    <Modal.Description>
                        <Header>Бог в помощь!</Header>
                        <Button type='submit' onClick={this.onSupport}>Понятно</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );

        let options = [];
        if(this.props.connections.names) {
            this.props.connections.names.map((item, i) => {
                options.push({key: this.props.connections.id[i], text: item, value: this.props.connections.id[i]})
            });
            options.push({key: 777, text: newConnectionModal, value: 777});
        }
        return(
                <Menu inverted id='navBar'>
                    <Menu.Item>
                        <img id='logo' src="/logo.png" alt='' />
                    </Menu.Item>
                    {this.props.user &&
                    <div style={{display:'flex'}}>
                        <Menu.Item className='navButton'>
                            <Dropdown  selection style={{height:'100%'}} text='Database' options={options}  onChange={this.handleChange} defaultValue={options[0]}/>
                        </Menu.Item>
                        {newConnectionModal}
                    </div>}
                    <div className='right'>
                        {alertModal()}
                    {/*<Menu.Item*/}
                        {/*className='navButton'*/}
                        {/*name='support'*/}
                        {/*as='a'*/}
                        {/*onClick={this.onSupport}*/}
                    {/*/>*/}
                        {this.props.user &&
                    <Menu.Item
                        className='navButton'
                        name='Log out'
                        as='a'
                        onClick={this.onLogOut}
                    />}
                    </div>
                </Menu>
        );

    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        cookie: ownProps.cookies,
        connections: store.dbState.connections,
        message: store.errorState.message,
        user: store.userState.user_id
    };
};

export default withRouter(withCookies(connect(mapStateToProps)(HeaderBar)));

