import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here

class Footer extends Component {
  render() {
    return (
    	<footer>
        <div className="footer-container footer p-3">
          <span>國立臺灣大學National Taiwan University 10617 臺北市羅斯福路四段一號</span><br/> 
          <span><i class="fas fa-phone"></i> +886-2-23635251 ext. 6608</span><br/>
          <span>Copyright 2019 IRL All Rights Reserved</span>
        </div>
        <ScrollUpButton style={{width: 50, borderRadius: 50}} ToggledStyle={{right: 25}}/>
      </footer>
    );
  }
}
export default Footer;