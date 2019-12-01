import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import fiveG from '../img/5g.png'
import VR from '../img/vr.png'
import BC from '../img/blockchain.png'
import iot from "../img/iot.png"
import Editor, {Section} from '../components/Editor';
import db from '../util/firebase';

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
        editMode: false,
        sections: [],
    };
    this.toggleEditMode = this.toggleEditMode.bind(this);
}

toggleEditMode = () => {
        this.setState((prevState) => {
            return { ...prevState, editMode: !prevState.editMode };
          });
  }

    // Component life cycle
    componentDidMount(){
      const blockchainRef = db.collection("pages").doc("about");
      blockchainRef.get().then((doc) =>{
        if (doc.exists) {
          this.setState({sections: doc.data().sections});
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    }

  render() {
    return (
      <div className="main-container">           
            <div className='index-container'>
              <div className="col-lg-12 text-justify yahei">
                <h1>關於我們</h1>
                <ol className="breadcrumb bg-transparent p-1">
                  <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
                  <li className="breadcrumb-item active">關於我們</li>
                </ol>
                <hr/>
              </div>
              <div className="mx-3">
                <div className="mb-5 text-justify">
                {
                        this.state.editMode ? (
                            <div>
                                <button className="button-normal  col" onClick={this.toggleEditMode}><i className="fas fa-arrow-left fa-2x"></i> <p>離開並放棄更新</p></button>
                                <Editor
                                    sections={this.state.sections}
                                    onLeave={this.toggleEditMode}
                                    doc="about"
                                />
                            </div>

                        ) : (
                                <div>
                                    {this.context.canEdit ?
                                        (<div className="row" style={{ textAlign: "left" }}>
                                            <button className="button-normal " onClick={this.toggleEditMode}><p>編輯</p><i className="far fa-edit fa-2x"></i></button>
                                            <button className="button-normal " onClick={() => { window.location.reload(); }}> <p>重新整理</p><i className="fas fa-sync fa-2x"></i></button>
                                        </div>) :
                                        null
                                    }
                                    {
                                        this.state.sections.map((section) => (
                                            <Section
                                                section={section}
                                            />
                                        )
                                        )
                                    }
                                    <div className="md-4" style={{marginTop: "30px"}}>
                    
                    <div className='d-flex row'>
                      <div className='col-lg-3 pb-3 text-center'>
                        <NavLink to='/research/ec'>
                          <div className='backgroundcircle m-auto'>
                            <img src={fiveG} alt='icon'/>
                          </div>
                          <div className='pt-3'>
                            <p className='yahei'>5G邊緣運算</p>
                          </div>
                        </NavLink>
                      </div> 
                      <div className='col-lg-3 pb-3 text-center'>
                        <NavLink to='/research/vr'>
                          <div className='backgroundcircle m-auto'>
                            <img src={VR} alt='icon'/>
                          </div>
                          <div className='pt-3'>
                            <p className='yahei'>虛擬實境和擴增實境</p>

                          </div>
                        </NavLink>
                      </div>
                      <div className='col-lg-3 pb-3 text-center'>
                        <NavLink to='/research/bc'>
                          <div className='backgroundcircle m-auto'>
                            <img src={BC} alt='icon'/>
                          </div>
                          <div className='pt-3'>
                            <p className='yahei'>區塊鏈</p>
                          </div>
                        </NavLink>
                      </div>
                     
                      <div className='col-lg-3 pb-3 text-center'>
                        <NavLink to='/research/bc'>
                          <div className='backgroundcircle m-auto'>
                            <img src={iot} alt='icon'/>
                          </div>
                          <div className='pt-3'>
                            <p className='yahei'>智慧物聯網</p>
                          </div>
                        </NavLink>
                      </div>                      
                    </div>
                  </div>   
                                </div>

                            )
                    }
                                                   
                </div>
              </div>  
            </div>          
        </div>
    );
  }
}
export default About;