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

class HeaderBar extends Component{
    constructor(props){
        super(props);
        let visible;
        if (this.props.cookie.get('session_username') !== '')
            visible = true;
        this.state = {
            controlButtonsVisible: visible,
            host:'localhost',
            db:'',
            user:'',
            password:'',
            dbms:'PostgreSQL',
            open: false,
        }
    }

    componentDidMount(){
        store.dispatch(clearErr());
        store.subscribe(() => this.forceUpdate());
    }

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


    render(){
        const headerMsg = {
            fontSize:' 20px',
            color:'red'
        };
        const ModalModalExample = () => (
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

        let options = [];
        if(this.props.connections.names) {
            this.props.connections.names.map((item, i) => {
                options.push({key: this.props.connections.id[i], text: item, value: this.props.connections.id[i]})
            });
            options.push({key: 777, text: ModalModalExample, value: 777});
        }
        return(
                <Menu inverted id='navBar'>
                    <Menu.Item>
                        <img id='logo' src="/logo.png" alt='' />
                    </Menu.Item>
                    {this.state.controlButtonsVisible &&
                    <div style={{display:'flex'}}>
                        <Menu.Item className='navButton'>
                            <Dropdown  selection style={{height:'100%'}} text='Database' options={options}  onChange={this.handleChange} defaultValue={options[0]}/>
                        </Menu.Item>
                        {ModalModalExample}
                    </div>}
                    <div className='right'>
                        {this.state.controlButtonsVisible &&
                    <Menu.Item
                        className='navButton'
                        name='support'
                        as='a'
                    />}
                    <Menu.Item
                        className='navButton'
                        name='Log out'
                        as='a'
                    />
                    </div>
                </Menu>
        );

    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        cookie: ownProps.cookies,
        connections: store.dbState.connections,
        message: store.errorState.message
    };
};

export default withCookies(connect(mapStateToProps)(HeaderBar));

