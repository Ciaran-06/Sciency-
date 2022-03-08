import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { unmountComponentAtNode } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch('http://localhost:9000/account')
      .then(res => res.text())
      .then(res => {
        this.setState({ apiResponse: res });
      });
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='App'>
        <h1>{this.state.apiResponse}</h1>
        <Account />
      </div>
    )
  }
};

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "succsess": false , "signup" : true, "response" : "" };
  }

  createAccount() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let email = document.getElementById("email").value;

    let data = {
      "username": user,
      "password": pass,
      "email": email
    };

    fetch('http://localhost:9000/account/signup', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then(res => res.text())
      .then(res => {
        this.setState({ apiResponse: res });
        this.setState({ "response" : res });
      });

    this.setState({ "signup": true });
  };

  

  render() {
    return (
      <div className="Account">
        <h1>Welcome To Sciencfy</h1>
        <div className="form">
          <input type="text" placeholder="Username" id="user" />
          <input type="password" placeholder="Password" id="pass" />
          {this.state.signup ? <input type="text" placeholder="email" id="email"></input> : null}
          <button onClick={this.createAccount.bind(this)}>Create Account</button>
        </div>
        <h1>{this.state.response}</h1>
      </div>
    );
  }
};
export default App;
