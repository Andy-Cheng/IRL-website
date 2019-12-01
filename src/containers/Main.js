import React, { Component } from 'react';
import Footer from "./../components/Footer"
import Navbar from "./../components/Navbar"
import Home from "./Home.js"
import Edge from './Edgecomputing.js'
import VRAR from './VRAR.js'
import BlockChain from './BlockChain.js'
import Contact from "./Contact.js"
import Paper from "./Paper.js"
import Research from "./Research.js"
import About from "./About.js"
import Advisor from "./Advisor.js"
import Login from "./Login.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { firebaseApp } from '../util/firebase';
import { AuthContext } from '../util/AuthContext';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, canEdit: false, logIn: this.logIn, logOut: this.logOut, checkUserState: this.checkUserState };
    this.checkUserState = this.checkUserState.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.checkUserState();
  }

  checkUserState = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        localStorage.setItem("user", user);
        localStorage.setItem("canEdit", true);
        this.setState({ user, canEdit: true });
      } else {
        // No user is signed in.
        this.setState({ user: null, canEdit: false });
      }
    });
  }

  logIn = (email, password) => (event) => {
    event.preventDefault();
    if (email !== null && password !== null) {
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              localStorage.setItem("user", user);
              localStorage.setItem("canEdit", true);
              this.setState({ user, canEdit: true });
            } else {
              // No user is signed in.
              localStorage.setItem("user", null);
              localStorage.setItem("canEdit", false);
              this.setState({ user: null, canEdit: false });
            }
          });

        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(`errorCode: ${errorCode}`);
          console.log(`errorMessage: ${errorMessage}`);

        });
    }

  }

  logOut = () => {
    firebaseApp.auth().signOut().then(() => {
      // Sign-out successfully.
      console.log("Sign-out successfully.");
      localStorage.setItem("user", null);
      localStorage.setItem("canEdit", false);
      this.setState({ user: null, canEdit: false });

    }).catch((error) => {
      // An error happened.
      console.log(`Sign-out error: ${error}`)
    });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/research" component={Research} />
            <Route path="/research/ec" component={Edge} />
            <Route path="/research/vr" component={VRAR} />
            <Route path="/research/bc" component={BlockChain} />
            <Route path="/advisor" component={Advisor} />
            <Route path="/project" component={Paper} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" render={() => { return this.state.canEdit ? <Redirect to="/" /> : <Login /> }} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </div>
      </AuthContext.Provider>
    );
  }
}
export default Main;