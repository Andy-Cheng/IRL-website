import React, { Component } from 'react';
import { AuthContext } from '../util/AuthContext';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {shouldShowPasswd: false, email: null, password: null};
        this.handleInput = this.handleInput.bind(this);
        this.toggleShowPasswd = this.toggleShowPasswd.bind(this);
        
    }

    handleInput = (event)  =>{
        this.setState({[event.target.name]: event.target.value});
    }


    toggleShowPasswd  = (event) =>{
        event.preventDefault();
        this.setState((prevState)=>({...prevState, shouldShowPasswd: !prevState.shouldShowPasswd}));
    }


    render() {

        return (
            
            <div className="row  my-5">

                <div className="col-xl-4 col-sm-3" />
                <div className="col-xl-4 col-sm-6">
                    <form >
                        <h2 className="text-center">管理者登入</h2>
                        <div className="form-group has-error">
                            <input type="text" className="form-control" name="email" placeholder="信箱" required="required"   onChange={this.handleInput}  value={this.state.email}/>
                        </div>
                        <div className="form-group has-error">
                            <input   type={this.state.shouldShowPasswd? "text":"password"} required="required" className="form-control" name="password" placeholder="密碼" onChange={this.handleInput} value={this.state.password}/>
                            <button
                            onClick={this.toggleShowPasswd}
                            className="button-normal-small"
                            >
                                {
                                    this.state.shouldShowPasswd? "隱藏密碼":"顯示密碼"
                                }
                            </button>
                        </div>
                        <div className="form-group my-5">
                            <button className="btn btn-primary btn-lg btn-block" onClick={this.context.logIn(this.state.email, this.state.password)}>登入</button>
                        </div>
                    </form>
                </div>
                <div className="col-xl-4 col-sm-3" />
            </div>
        );
    }
}

Login.contextType = AuthContext;

export default Login;

