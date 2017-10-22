/**
 * Created by intellicar-rinas on 22/10/17.
 */
import React, {Component} from 'react';
import './header.css';
import Dom from '../../helpers/Dom';
import $http from '../../helpers/$http';
import {API_HOST} from '../../constants';
import {save, get} from '../../helpers/helperFunctions';


class Header extends Component {

    state = {
        token:get('auth')
    };

    constructor(){
        super();

        this.openLogin = () => {
            this.setState({loginWindow: true})
        };

        this.closeLogin = () => {
            this.setState({loginWindow: false})
        };

        this.login = () => {
            let username = this.refs.username.value;
            let password = this.refs.password.value;
            // console.log(username, password);
            $http.post(API_HOST+'/api/gettoken', {user:{username, password}})
                .then((resp)=>{
                    let token = resp && resp.data && resp.data.data;
                    save('auth', token);
                    this.setState({token});
                    this.success();
                }, (resp)=>{
                    this.error("Invalid Username or Password");
                });

        };

        this.error = (err) => {
            this.setState({err})
        };

        this.success = () => {
            this.closeLogin();
            this.props.openAdminPage();
            this.refs.username.value = "";
            this.refs.password.value = "";
        }

        this.logout = () => {
            this.setState({token:null});
            save('auth', null);
        }
    }

    render() {
        return (
            <div className="Header">
                <div className="h-logo">Kunju<span>Travels</span></div>
                {
                    this.state.token ? (
                        <div>
                            <div className="h-login" onClick={this.logout}>Logout</div>
                            <div className="h-login -a" onClick={this.props.openAdminPage}>Admin</div>
                            <div className="h-login -b" onClick={this.props.closeAdminPage}>Home</div>
                        </div>
                    ) : (
                        <div className="h-login" onClick={this.openLogin}>Login</div>
                    )
                }
                <div className={Dom.Class({'active': this.state.loginWindow }, "h-loginWindow")}>
                    <div className="hlw-close" onClick={this.closeLogin}>x</div>
                    <div className="hlw-name">Login</div>
                    <input ref="username" placeholder="Username"/>
                    <input ref="password" type="password" placeholder="Password"/>
                    <button onClick={this.login}>Login</button>
                    {
                        this.state.err ? (
                            <div className="hlw-err">{this.state.err}</div>
                        ) : null
                    }
                </div>
            </div>
        )
    }

}

export default Header;