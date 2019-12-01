import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ImageZoom from 'react-medium-image-zoom';
import db from '../util/firebase';
import { generateUlContent, parseUlContent } from  '../util/Parsing';
import { AuthContext } from '../util/AuthContext';
import { imgurToken } from '../auth/auth.js';

const postImgurOptions = {
  method: 'post',
  url: 'https://api.imgur.com/3/image/',
  headers: {'Authorization': `Bearer ${imgurToken}`, 'Content-Type': 'multipart/form-data'}
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false, homeImage: "", about: "", 
    plans: [], editPlan: "", file: null, fileToImgur: null};
    
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSaveAndExit = this.onSaveAndExit.bind(this);
    this.deleteHomeImage = this.deleteHomeImage.bind(this);

  }

  toggleEditMode = () => {
    this.setState((prevState) => {
        return { ...prevState, editMode: !prevState.editMode };
      });
}

  captureFile = (event) => {
    const file = event.target.files[0];
    this.setState({
      file: URL.createObjectURL(file),
      fileToImgur: file,
    });
  }

  handleChange = (event) => {

    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  deleteHomeImage = () =>{
    this.setState({homeImage: ""});
  }

  onSaveAndExit =  async() =>{
    console.log("save and exit");
    if(this.state.fileToImgur === null){
      db.collection("pages").doc("home").set({
        homeImage: this.state.homeImage,
        about: this.state.about,
        plans: parseUlContent(this.state.editPlan)
      })
      .then(() => {
        console.log("Document successfully written!");
        this.toggleEditMode();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    }
    else{
      const form = new FormData();
      form.append("image", this.state.fileToImgur);
      
      
      await axios({...postImgurOptions, data: form}).then((res)=>{
        const url = `https://i.imgur.com/${res.data.data.id}.png`;
  
        db.collection("pages").doc("home").set({
          homeImage: url,
          about: this.state.about,
          plans: parseUlContent(this.state.editPlan)
        });
      })
        .then(() => {
          console.log("Document successfully written!");
          this.toggleEditMode();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
}

  // Component life cycle
  componentDidMount() {
    console.log("this.context", this.context)

    const blockchainRef = db.collection("pages").doc("home");
    blockchainRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({ homeImage: doc.data().homeImage, plans: doc.data().plans, about: doc.data().about, editPlan: generateUlContent(doc.data().plans)});
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  render() {
    const {editMode} = this.state;

    return (
      editMode ? (
        <div className="main-container">
          <div>
          <button className="button-normal  col" onClick={this.toggleEditMode}><i className="fas fa-arrow-left fa-2x"></i> <p>離開並放棄更新</p></button>            
            <div className="input-group mb-3">
              <div className="custom-file">
                <input type="file"
                  className="custom-file-input"
                  onChange={this.captureFile}
                />
                <label className="custom-file-label" for="inputGroupFile02">選擇封面照</label>
              </div>
            </div>
            <div>
              {this.state.file === null ? (this.state.homeImage===""? (null):(
              <div className="text-center">
                    <ImageZoom image={{ src: this.state.homeImage, className:'col-lg-8', alt: 'pic',  style: { width: '100%' , marginTop: "20px", marginBottom: "50px"} }} />
                </div>)) : (
                <div className="text-center">
                    <ImageZoom image={{ src: this.state.file, className:'col-lg-8', alt: 'pic',  style: { width: '100%' , marginTop: "20px", marginBottom: "50px"} }} />
                </div>
                )
              }
              <div className=" row">
                <button className="button-normal col" onClick={this.deleteHomeImage}>刪除封面照<i className="far fa-trash-alt"></i><p></p></button>
              </div>
              <div className='index-container'>
            <div className="mb-5 row">                
              <div className="col-lg container">
                <h2 className="yahei"><i className="fas fa-home"></i> 關於實驗室</h2>
                <textarea
                    className="form-control"
                    id="about"
                    value={this.state.about}
                    onChange={this.handleChange}
                    rows="25"
                  />                  
              </div>
              <div className="col-lg container">
                <h2 className="yahei"><i className="fas fa-user-friends"></i> 執行計畫</h2>
                <textarea
                    className="form-control"
                    id="editPlan"
                    value={this.state.editPlan}
                    onChange={this.handleChange}
                    rows="25"
                  />  
              </div>
            </div>
            <div className="row">
                    <button className="button-normal col " onClick={this.onSaveAndExit}><i className="far fa-save fa-2x"></i> <p> 儲存並更新頁面</p></button>
                </div>
          </div>

            </div>
          </div>
        </div>) : (
          <div className="main-container">
          {
            this.state.homeImage === ""? (null):(
            <img alt='bgimg' src={this.state.homeImage} style={{width:"100%" }}/>       
            )
          }
          <div className='index-container'>
            {
              this.context.canEdit?  (              
              <div className="row" style={{ textAlign: "left", marginBottom: "20px" }}>
                <button className="button-normal " onClick={this.toggleEditMode}><p>編輯</p><i className="far fa-edit fa-2x"></i></button>
                <button className="button-normal " onClick={() => { window.location.reload(); }}> <p>重新整理</p><i className="fas fa-sync fa-2x"></i></button>
              </div> ) : (null)
            }

            <div className="mb-5 row">                
              <div className="col-lg container">
                <h2 className="yahei"><i className="fas fa-home"></i> 關於實驗室</h2>
                <p>
                &emsp;&emsp;
                {this.state.about}
                </p>               
              </div>
              <div className="col-lg container">
                <h2 className="yahei"><i className="fas fa-user-friends"></i> 執行計畫</h2>
                <ul className="text-left">
                  {
                    this.state.plans.map((plan, key)=>(
                      <li key={key}>
                          {plan}
                      </li>
                    ))
                  }
                </ul>
                <NavLink to="/about"><button className="btn btn-outline-primary">詳細介紹...</button></NavLink>
              </div>
            </div>
          </div>
          </div>
      )
      

    );
  }
}

Home.contextType = AuthContext;

export default Home;