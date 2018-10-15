import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import SignIn from "./sign_in_up/SignIn"
import SignUp from "./sign_in_up/SignUp";
import HeaderBar from "./header/HeaderBar"
import MainPage from "./main/MainPage";
import {withCookies} from "react-cookie";
import TableSidebar from "./main/TableSidebar";

class App extends Component {
    render() {
        return (
                <div id='flexContainer' style={{height:'100%'}} >
                    <HeaderBar/>
                    <div id='appWrapper' style={{height:'100%'}} >
                        <Switch>
                            <Route path="/login" render={() => (<SignIn cookies={this.props.cookies}/>)} />
                            <Route path="/register" render={() => (<SignUp cookies={this.props.cookies}/>)}/>
                            <Route exact path='/' render={() => (<TableSidebar cookies={this.props.cookies}/>)}/>
                        </Switch>
                    </div>
                </div>
        );
    }
}

export default withCookies(App);
