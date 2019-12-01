import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import {Table} from "reactstrap"
import db from '../util/firebase';

class Paper extends Component {
  constructor(props){
    super(props);
    this.state = {
      papers: []
    };
}
    // Component life cycle
    componentDidMount(){
      const paperRef = db.collection("pages").doc("papers");
      paperRef.get().then((doc) =>{
        if (doc.exists) {
          // console.log("Document data:", doc.data().sections);
          // console.log(this)
          this.setState({papers: doc.data().papers});
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
          <div className='text-justify yahei col-lg-12'>
            <h1>論文發布</h1>
            <ol className="breadcrumb bg-transparent p-1">
              <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
              <li className="breadcrumb-item active">論文發布</li>
            </ol>
            <hr/>
          </div>
            <div class="mb-5 justify-content-center row">
                <div className="text-justify col-lg-11">
                    <Table hover className="pubulication-table">
							        <thead>
							          <tr>
							            <th>Conference & proceeding papers</th>
							            <th>Date</th>
							          </tr>
							        </thead>
							        <tbody>
							          {
                          this.state.papers.map((paper)=>(
                            <tr>
                            <td>{paper.title}</td>
                            <td>{paper.date}</td>
                          </tr>
                          ))
                        }
							        </tbody>
							      </Table>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default Paper;