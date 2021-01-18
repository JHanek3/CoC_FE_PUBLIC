import React, {useState, useEffect} from "react"
import './App.css';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Forgot from './components/auth/Forgot'
import Reset from "./components/auth/Reset"
import UserContext from './context/userContext'


function App() {

  const [ userData, setUserData ] = useState({
    token : undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "")
        token = ""
      }
      const tokenResponse = await axios.post('http://localhost:9000/tokenIsValid', null, {headers: {"x-auth-token": token,}})
      
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:9000", {
          headers: { "x-auth-token": token,
                      'Access-Control-Allow-Origin': '*' 
        },
        })
        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  }, [])  
  
  return (
    <UserContext.Provider value={{ userData, setUserData}}>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/reset/:token" component={Reset} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
