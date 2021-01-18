import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import {Container, Row, Col} from 'react-bootstrap'

function Forgot() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [counter, setCounter] = useState()
  const history = useHistory()

  useEffect(() => {
    const timer = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const submit = async (e) => {
    e.preventDefault()
    // console.log(`Submitted ${email}`)
    try {
      setError()
      const forgotEmail = {email: email.toLowerCase()}
      const forgotResponse = await axios.post("http://localhost:9000/forgot", forgotEmail)
      // console.log(forgotResponse)
      setSuccess(forgotResponse.data.msg + email)
      setCounter(3)
      setTimeout(function() {
        history.push("/login")
      }, 3000)
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data.msg)
      }
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <form onSubmit={submit} className="centerForm">
            <h2 className="centerHeader">Forgot Password</h2>
            <label className="centerLabel">Email:</label><br/>
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} required /><br/>
            {(error) && <p className="errorP">{error}</p>}
            <input type="submit" value="Submit" className="frontPageButton" /><br/>
            {(success) &&
              <div>
                <b>{success}</b><br/>
                <b>You will be redirected in {counter}</b>
              </div>
            }
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default Forgot