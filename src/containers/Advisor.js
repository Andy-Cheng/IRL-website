import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Editor, { Section } from '../components/Editor'
import db from '../util/firebase'
import { AuthContext } from '../util/AuthContext';


class Advisor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      profilePic: "",
      sections: [
      ],
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
    const advRef = db.collection("pages").doc("advisor");
    advRef.get().then((doc) =>{
      if (doc.exists) {
        // console.log("Document data:", doc.data().sections);
        // console.log(this)
        this.setState({profilePic: doc.data().profilePic, sections: doc.data().sections});
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
    const { editMode } = this.state;
    return (editMode ? (
      <div className="main-container">
        <div className='index-container'>
          <div className="col-lg-12 text-justify yahei">
            <h1>指導教授</h1>
            <ol className="breadcrumb bg-transparent p-1">
              <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
              <li className="breadcrumb-item active">指導教授</li>
            </ol>
            <hr />
          </div>
          
          <button className="button-normal col" onClick={this.toggleEditMode}><i className="fas fa-arrow-left fa-2x"></i> <p>離開並放棄更新</p></button>
          <div className="justify-content-center my-5 row">
            <div className="col-lg-4">
              <img alt='professor' src={this.state.profilePic} style={{ height: "300px" }} />
            </div>
            <div className="col-lg-8 prof-name">
              <p>廖婉君   Wan-jiun Liao</p>
              <ul>
                <li>Distinguished Professor, Department of Electrical Engineering,NTU</li>
                <li>Professor, Graduate Institute of Communication Engineering, NTU</li>
                <li>Professor, Graduate Institute of Networking and Multimedia, NTU</li>
              </ul>
            </div>
          </div>
          <Editor
          sections={this.state.sections}
          onLeave={this.toggleEditMode}
          doc="advisor"
          profilePic={this.state.profilePic}
          />
        </div>
      </div>
    ) : (
        <div className="main-container">
          <div className='index-container'>
            <div className="col-lg-12 text-justify yahei">
              <h1>指導教授</h1>
              <ol className="breadcrumb bg-transparent p-1">
                <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
                <li className="breadcrumb-item active">指導教授</li>
              </ol>
              <hr />
            </div>
            {this.context.canEdit ?
              (<div className="row" style={{ textAlign: "left" }}>
                <button className="button-normal " onClick={this.toggleEditMode}><p>編輯</p><i className="far fa-edit fa-2x"></i></button>
                <button className="button-normal " onClick={() => { window.location.reload(); }}> <p>重新整理</p><i className="fas fa-sync fa-2x"></i></button>
              </div>) :
              null
            }
            <div className="justify-content-center my-5 row">
              <div className="col-lg-4">
                <img alt='professor' src={this.state.profilePic} style={{ height: "300px" }} />
              </div>
              <div className="col-lg-8 prof-name">
                <p>廖婉君   Wan-jiun Liao</p>
                <ul>
                  <li>Distinguished Professor, Department of Electrical Engineering,NTU</li>
                  <li>Professor, Graduate Institute of Communication Engineering, NTU</li>
                  <li>Professor, Graduate Institute of Networking and Multimedia, NTU</li>
                </ul>
              </div>
            </div>
            <div className="px-3 justify-content-center text-justify row">
            <div className="col-lg-12 mb-4">

              {this.state.sections.map((section) => (
                <Section
                  section={section}
                />))}
                </div>
            </div>
          </div>
        </div>));
  }
}

Advisor.contextType = AuthContext;
export default Advisor;