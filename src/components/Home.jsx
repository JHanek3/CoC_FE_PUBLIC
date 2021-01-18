import React, {useEffect, useContext} from "react"
import {useHistory} from "react-router-dom"
import UserContext from "../context/userContext"
import {Container, Row, Col} from 'react-bootstrap'

function Home() {
  const { userData, setUserData} = useContext(UserContext)
  const history = useHistory()

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem("auth-token", "")
    history.push("/login")
  }

  useEffect(() => {
    if (!userData.user) {
      history.push("/login")
    } 
  }, [])
  
  return (
    <div>
      {userData.user ? (
        <Container fluid>
          <Row>
            <Col>
              <div className="homeDiv">
                <h1 className="homeHeader">Welcome {userData.user.username}</h1>
                <button className="homeButton" onClick={logout}>Log Out</button>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Col>
              <div className="homeDiv">
                <h2 className="homeHeader">You are not logged in</h2>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default Home