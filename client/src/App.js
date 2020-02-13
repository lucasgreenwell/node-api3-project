import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter,Route,  Link} from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => {
        // console.log(res.data)
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" render={props => {
          return <Users users={users}/> 
        }}/>
        <Route path="/users/:id" render={props => {
          
          return <User id={props.match.params.id}/>
        }}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
