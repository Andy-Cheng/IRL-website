import React, { Component } from 'react';
import { NavLink } from "react-router-dom"

class Contact extends Component {
  render() {
    return (
      <div className="main-container">
        <div className='index-container text-center'>
          <div className="text-justify yahei col-lg-12">
            <h1>聯絡我們</h1>
            <ol className="breadcrumb bg-transparent p-1">
              <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
              <li className="breadcrumb-item active">聯絡我們</li>
            </ol>
            <hr/>
          </div>
          <div className="small-container">
            <p>BL-608<br/>Department of Electrical Engineering<br/>National Taiwan University<br/>Taipei 106, Taiwan</p>               
            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1114.3885386779625!2d121.54183521488379!3d25.01933960937919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa267158ff23%3A0x280b7e1a98cc05ca!2z6Ie654Gj5aSn5a245Y2a55CG6aSo!5e0!3m2!1szh-TW!2stw!4v1563729498048!5m2!1szh-TW!2stw" width="600" height="450" frameborder="0" allowfullscreen></iframe>               
          </div>
        </div>       
      </div>
    );
  }
}
export default Contact;