import React, {useState, useEffect} from "react"
import {useParams} from 'react-router'
import axios from "axios"
import {Container, Row, Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'


function Reset() {
  const {token} = useParams()
  const [getSuccess, setGetSuccess] = useState('')
  const [getError, setGetError] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [postSuccess, setPostSuccess] = useState('')
  const [postError, setPostError] = useState('')

  const history = useHistory()
  
  useEffect(() => {
    const checkToken = async (req, res) => {
      try {
        // console.log(token)
        const getResetTokenResponse = await axios.get("http://localhost:9000/reset/:token", {  
          params: {
            resetToken: token
          }
        })
        // console.log(getResetTokenResponse.data.msg)
        setGetError(null)
        setGetSuccess(getResetTokenResponse.data.msg)
      } catch (err) {
        if (err.response.data.msg) {
          // console.log(err.response.data.msg)
          setGetError(err.response.data.msg)
        }
      }
    }
    checkToken()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    // console.log("Submitted")
    // console.log(password)
    // console.log(confirmPassword)
    try {
      const resetPassword = {password, confirmPassword}
      setPostError('')
      const postResetPassword = await axios.post("http://localhost:9000/reset/:token", resetPassword, {    
        params: {
          resetToken: token,
        },
      })
      // console.log(postResetPassword.data.msg)
      setPostSuccess(postResetPassword.data.msg)
      setTimeout(function(){history.push("/login")}, 3000)
    } catch (err) {
      if (err.response.data.errors) {
        setPassword('')
        setConfirmPassword('')
        // console.log(err.response.data.errors)
        setPostError(err.response.data.errors.map((e) => e.msg))
      }
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          {getError ?
            <form className="centerForm">
              <h2 className="centerHeader">Forgot Password</h2>
              <h3 className="centerP">{getError}</h3>
            </form>
            :
              <form onSubmit={submit} className="centerForm">
                <h2 className="centerHeader">Forgot Password</h2>
                {postSuccess ?
                  <> 
                    <b>{postSuccess}</b><br/>
                    <b>Redirecting to login...</b><br/>
                  </>
                  : ""
                }
                <label className="centerLabel">Password:</label><br/>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required /><br/>
                {(postError.includes("Password must be at least 8 characters")) && <p className="errorP">Password must be at least 8 characters</p>}
                {(postError.includes("Passwords with & are not allowed")) && <p className="errorP">Passwords with & are not allowed</p>}

                <label className="centerLabel">Confirm Password:</label><br/>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/><br/>
                {(postError.includes("Passwords do not match")) && <p className="errorP">Passwords do not match</p>}
           
                <input type="submit" value="Submit" className="frontPageButton" /><br/>
              </form>
          }      
        </Col>
      </Row>
    </Container>
  )
}

export default Reset