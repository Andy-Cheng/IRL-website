import React,{ Component } from 'react';
import { Slide } from 'react-slideshow-image';
import bgimg1 from "../img/bg1.png" 
import bgimg2 from "../img/bg2.png"
import bgimg3 from "../img/6.jpg"
import "../css/slider.css"

const slideImages = [
  bgimg1,
  bgimg2,
  bgimg3
];

const properties = {
  duration: 7000,
  transitionDuration: 600,
  infinite: true,
  indicators: false,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
 
class Sliders extends Component {
  render() {
    return (
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})`,
      backgroundSize: '100% 100%'}}>
            <span>實驗室研究方將***********</span>
          
          </div>
        </div>
        <div className="each-slide">
          <div style={{backgroundImage: `url(${slideImages[1]})`,backgroundSize: '100% 100%'}}>
            <span>實驗室最新計畫xxxxxxxxxxxxxxxx</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>實驗室研究方向xxxxxxxxxxxxxxx</span>
          </div>
        </div>
      </Slide>
    )
  }
}
export default Sliders;