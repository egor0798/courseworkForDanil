import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import store from '../../store';
import {Button, Form} from "semantic-ui-react";
import {clearErr, setErr} from "../../action/error-action";
import {register} from "../../api/user-api";
import {withRouter} from "react-router-dom";


class SignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            login: '',
            email: '',
            password: '',
            password1: '',
            submitted: false
        };
        debugger;
    }
    
    componentWillMount(){
        if (this.props.cookie.get('session_username'))
            this.props.history.push('/');
    }
    
    componentDidMount(){
        store.dispatch(clearErr());
    }

    onChange = (e) =>{
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({submitted:true});
        store.dispatch(clearErr());
        if(this.state.password !== this.state.password1) {
            store.dispatch(setErr("Passwords do not match"));
        }
        if(this.state.email && this.state.login && this.state.password && this.state.password === this.state.password1) {
            register(this.state.login, this.state.password, this.state.email, this.props.history, this.props.cookie);
        }
    };

    render(){
        const help_block = {
            fontSize:' 12px',
            color:'red'
        };
        const headerMsg = {
            fontSize:' 20px',
            color:'red'
        };
        const {login, email, password, password1, submitted} = this.state;
        return(
            <div style={{width:'30%', marginLeft:'5vw', marginTop:'5vh'}}>
                <div style={headerMsg}>{this.props.message}</div>
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <input type="text" name='email' onChange={this.onChange} value={email}/>
                        { submitted && !email && <div style={help_block}>email is required</div>}
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input size='large' name='login' value={login} onChange={this.onChange}/>
                        { submitted && !login && <div style={help_block}>login is required</div>}
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' size='large' name='password' value={password} onChange={this.onChange}/>
                        { submitted && !password && <div style={help_block}>password is required</div>}
                    </Form.Field>
                    <Form.Field>
                        <label>Password again</label>
                        <input type='password' size='large' name='password1' value={password1} onChange={this.onChange}/>
                        { submitted && !password && <div style={help_block}>password is required</div>}
                    </Form.Field>
                    <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
                </Form>
                <h1>Already registered?</h1>
                <Link to="/login">
                    <Button secondary>
                        Login
                    </Button>
                </Link>
            </div>

        )
    }
}
const mapStateToProps = (store, ownProps) => {
    return {
        message: store.errorState.message,
        cookie: ownProps.cookies
    };
};

export default withRouter(connect(mapStateToProps)(SignUp));