import React, {Component} from "react";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import store from '../../store';
import {clearErr} from "../../action/error-action";
import {register} from "../../api/user-api";
import {withRouter} from "react-router-dom"

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            login: '',
            password: '',
            submitted: false
        };
    }

    componentWillMount(){
        if (this.props.cookie.get('session_username') !== '')
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
        if(this.state.login && this.state.password) {
            register(this.state.login, this.props.history);
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
        const {login, password, submitted} = this.state;
        return(
            <div>
                <div style={headerMsg}>{this.props.message}</div>
                <form name="signUp" method="post" onSubmit={this.handleSubmit}>
                    <p>login<br/>
                        <input type="text" name='login' onChange={this.onChange} value={login}/>
                        { submitted && !login && <div style={help_block}>login is required</div>}
                    </p>
                    <p>password<br/>
                        <input type="password" name='password' onChange={this.onChange} value={password}/>
                        { submitted && !password && <div style={help_block}>password is required</div>}
                    </p>
                    <p><Button primary>Sign In</Button></p>
                </form>

                <h1>Not registered?</h1>
                <Button secondary>
                    <Link to="/register">Register</Link>
                </Button>
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

export default withRouter(connect(mapStateToProps)(SignIn));