import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import db from '../util/firebase'
import Editor, {Section} from '../components/Editor';
import { AuthContext } from '../util/AuthContext';


class Edgecomputing extends Component {
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
    const edgeRef = db.collection("pages").doc("edge");
    edgeRef.get().then((doc) =>{
      if (doc.exists) {
        // console.log("Document data:", doc.data().sections);
        // console.log(this)
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
                        <h1>5G 邊緣運算</h1>
                        <ol className="breadcrumb bg-transparent p-1">
                            <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to="/research">研究項目</NavLink></li>
                            <li className="breadcrumb-item active">5G 邊緣運算</li>
                        </ol>
                        <hr />
                    </div>
                    {
                        this.state.editMode ? (
                            <div>
                                <button className="button-normal  col"  onClick={this.toggleEditMode}><i className="fas fa-arrow-left fa-2x"></i> <p>離開並放棄更新</p></button>
                                <Editor
                                    sections={this.state.sections}
                                    onLeave={this.toggleEditMode}
                                    doc="edge"
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
                                </div>

                            )
                    }
                    
                </div>
            </div>
        );
    }
}

Edgecomputing.contextType = AuthContext;

export default Edgecomputing;