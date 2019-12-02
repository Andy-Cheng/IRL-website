import React from 'react';
import Main from "./containers/Main.js"
import "./css/styles.css"
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
        <div className="App">
          <Main />
        </div>
      </HashRouter>
  );
}

export default App;
