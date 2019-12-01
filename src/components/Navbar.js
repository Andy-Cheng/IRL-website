import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../util/AuthContext';


class Navbar extends Component {

  render() {
    return (
    	<header>
        <div className="main-container">
        <div className="first-container text-justify"> 
            <NavLink to="/"><h1>Internet Research Lab</h1></NavLink> 
            <img alt="ntu_logo" src={require('../img/ntu.png')}/>
            <h5>National Taiwan University</h5>          
        </div>
        <div className="navbar-container">
            <nav id="navbar" className="navbar navbar-expand-xl navbar-dark fixed" style={{transition: ".5s"}}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06">
                    <span className="navbar-toggler-icon"></span>
                </button>   
                <span className="navbar-brand" style={{color:'white'}}>Internet Research Lab</span>            
                <div className="collapse navbar-collapse navbar-items" id="navbarsExample06">
                    <ul className="navbar-nav mr-auto">                       
                        <li className="nav-item active"> 
                          <NavLink onClick={this.close} className="nav-link" to="/about">關於我們</NavLink>
                        </li> 
                        <li className="nav-item dropdown">                               
                            <NavLink className="nav-link active dropdown-toggle" to="/research" id="navbarDropdown">
                              研究項目
                            </NavLink>
                            <div className="dropdown-menu">
                              <NavLink to="/research/bc"><span className='dropdown-item'>區塊鏈/智慧物聯網</span></NavLink>
                              <NavLink to="/research/vr"><span className='dropdown-item'>VR/AR</span></NavLink>
                              <NavLink to="/research/ec"><span className='dropdown-item'>5G邊緣運算</span></NavLink>
                            </div>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/advisor">指導教授</NavLink>
                        </li>                        
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/project">論文發布</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/contact">聯絡我們</NavLink>
                        </li>
                    </ul>
                    {
                      this.context.canEdit ? (
                      <button onClick={this.context.logOut} className="button-normal nav-item active fas fa-sign-out-alt" style={{color:'white'}}>
                        登出
                      </button>
                      ):(                    
                        <div className="nav-item active">
                          <NavLink className="nav-link fas fa-user-lock" style={{color:'white'}}  to="/login">管理者登入</NavLink>
                        </div>)
                    }
                </div>
            </nav>            
        </div>
        </div>
      </header>
    );
  }
}

Navbar.contextType = AuthContext;

export default Navbar;