import React, { Component } from 'react';
import Header from "../partials/Header"
import { Input, Button } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css';
import './Login.css'

const baseURL = 'https://swapi.co/api/people'

class Login extends React.Component{

  state = {
    userName: '',
    password: '',
    error: ''
  }

  handleSubmit = () => {
    console.log("state", this.state)
    let {userName, password} = this.state

    axios.get(baseURL+ '?search=' + userName)
    .then((res) => {
      console.log("res",res)
      const data = res.data

      if(data.count > 0){
        const userData = data.results[0]
        if((userData.birth_year == password) && ((userData.name).toLowerCase() == userName.toLowerCase())){
          //successful login
          localStorage.setItem('userName', userData.name)
          localStorage.setItem('userUrl', userData.url)
          this.props.history.push("/search")
        }else{
          // invalid credentials
          this.setState({ error: "Invalid Username or Password" })
        }
      }else{
        // user not found
        this.setState({ error: "Invalid Username or Password" })
      }

    })
    .catch((err) => {
      console.log("err",err)
      this.setState({ error: "Something failed" })
    })
  }

  render(){
    console.log("this.props", this.props)
    const { error } = this.state
    return(
      <div>
        <Header />
        <div className="inputDiv">
          <span className="loginText" style={{fontWeight: "bold", fontSize: '20px'}}>Login</span>
          <Input value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value})} className="loginInput" placeholder="Name" />
          <Input.Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} className="loginInput" placeholder="Password"  />
          <Button type='primary'  className="submit" onClick={this.handleSubmit} >Log Me In</Button>
          {error && <span style={{color: 'red'}}>{error}</span>}
        </div>
      </div>
    )
  }
}

export default Login;