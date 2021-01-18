import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import UserContext from "../../context/userContext"
import {Container, Row, Col} from 'react-bootstrap'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState([])
  const [success, setSuccess] = useState()

  const {setUserData} = useContext(UserContext)
  const history = useHistory()

  const submit = async (e) => {
    e.preventDefault()


    try {
      setError([])
      const newUser = {email, password, confirmPassword, username}
      const registerResponse = await axios.post("http://localhost:9000/register", newUser)
      //Get this weird error, where it doesn't post correctly the first time, but does post correctly the second time
      // const loginResponse = await axios.post("http://localhost:9000/login", {
      //   email, password, username
      // })
      // console.log(loginResponse)
      // setUserData({
      //   token: loginResponse.data.token,
      //   user: loginResponse.data.user
      // })
      // localStorage.setItem("auth-token", loginResponse.data.token)
      setPassword("")
      setConfirmPassword("")
      setSuccess("Account created!")
      //Node cannot be found in the current page?
      // console.log(registerResponse)
      setTimeout(function() {
        history.push("/login")
      }, 3000)
    } catch (err) {
    
      //I hate this error handling with express-validation, in the future hopefully
      //ill find a way to make it easier. React just doesn't like receiving objects and rendering them
      if (err.response.data.errors) {
        setPassword("")
        setConfirmPassword("")
        setError(err.response.data.errors.map((e) => e.msg))
      } 
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <form onSubmit={submit} className="registerForm">
            <h2 className="registerHeader">Register</h2>
            {success ?
                  <div className="registerSuccess"> 
                    <b>{success}</b><br/>
                    <b>Redirecting to login...</b><br/>
                  </div>
                  : ""
            }
            <label className="registerLabel">Email: </label>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} required /><br/>
            {(error.includes("Invalid email")) && <p className="errorP">Invalid Email</p>}

            <label className="registerLabel">Username:</label>
            <input type="text" placeholder="Email by default" id="username" onChange={e => setUsername(e.target.value)} /><br/>
            {(error.includes("Usernames with & are not allowed")) && <p className="errorP">Usernames with & are not allowed</p>}

            <label className="registerLabel">Password:</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required /><br/>
            {(error.includes("Password must be at least 8 characters")) && <p className="errorP">Password must be at least 8 characters</p>}
            {(error.includes("Passwords with & are not allowed")) && <p className="errorP">Passwords with & are not allowed</p>}

            <label className="registerLabel">Confirm Password:</label>
            <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/><br/>
            {(error.includes("Passwords do not match")) && <p className="errorP">Passwords do not match</p>}

            <div className="buttonContainer">
              {(error.includes("An account with this email already exists")) && <p className="errorP">An account with this email already exists</p>}
              <button type="submit" value="Submit" className="registerButton">Register</button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
