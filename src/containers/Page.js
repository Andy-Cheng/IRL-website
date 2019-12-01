import React, { Component } from 'react';
import { NavLink } from "react-router-dom"
import data from "../data/data.js"
import img1 from "../img/5.jpg"

class Page extends Component {
  render() {
    const postids=data.posts_number
    const {id} = this.props.match.params;
    return id && postids.includes(id)? (
      <div className="main-container">          
          <div className='index-container'>
            <div className="col-lg-12 yahei text-justify">
              <ol className="breadcrumb bg-transparent p-1">
                <li className="breadcrumb-item"><NavLink to="/">首頁</NavLink></li>
                <li className="breadcrumb-item"><NavLink to="/news">最新消息</NavLink></li>
                <li className="breadcrumb-item active">{data.posts[id].title || 'N/A'}</li>
              </ol>
              <hr/>
            </div>
            <div class="mb-5 row">
              <div className="px-5">
                <div className="event-container text-justify">
                  <h4>{data.posts[id].date || 'N/A'}</h4>
                  <h3>{data.posts[id].title || 'N/A'}</h3>
                  <p>{data.posts[id].text || 'N/A'}</p>
                  <div className='text-center'>
                    <img src={data.posts[id].image || img1} className="img-fluid mx-auto d-block" width="70%" alt="news" />
                    <p className="font-italic">藍藍路</p>
                  </div>
                </div>                
              </div>                                            
            </div> 
          </div>           
      </div>
    ):(
      <div>
        <h3>Error: Post #{id} NOT FOUND</h3>
      </div>
    )
  }
}
export default Page;