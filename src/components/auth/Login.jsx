import React, {useState, useContext} from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"
import UserContext from "../../context/userContext"
import {Link} from 'react-router-dom'

import {Container, Row, Col} from 'react-bootstrap'

function Login () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()

  const {setUserData} = useContext(UserContext)
  
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()
    try {
      // console.log(email)
      setError()
      const loginUser = {email: email.toLowerCase(), password}
      const loginResponse = await axios.post("http://localhost:9000/login", loginUser)
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      })
      localStorage.setItem("auth-token", loginResponse.data.token)
      history.push("/")
    } catch (err) {
      if (err.response.data.msg) {
        console.log(password)
        setPassword("")
        setError(err.response.data.msg)
      }
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <form onSubmit={submit} className="centerForm">
            <h2 className="centerHeader">Login</h2>
            
            <label className="centerLabel">Email: </label><br/>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required /><br/>
            {(error && error[0] === "N") && <p className="errorP">{error}</p>}
            
            <label className="centerLabel">Password: </label><br/>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required /><br/>
            {(error && error[0] ==="I") && <p className="errorP">{error}</p>}
            <Link to="/forgot" className="forgotLink">Forgot Password?</Link><br/>
            
            <input type="submit" value="Login" className="frontPageButton" /><br/>
            
            <div className="linkContainer">
              <p className="centerP">Not an investigator?</p>
              <Link to="/register" className="signLink">Sign Up Now!</Link>
            </div>
          
          </form>
        </Col>
      </Row>
    </Container> 
  )
}

export default Login