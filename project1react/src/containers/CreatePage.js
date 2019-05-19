import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import fatal from '../assets/fatal.png';
//import { connect } from 'react-redux';

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      sex: "",
      age: "",
      password: "",
      rPassword: "",
      error: null,
      isLoading: false
    }
  }
  handleFirstnameChange = (event) => {
    this.setState({ firstName: event.target.value });
  }
  handleLastnameChange = (event) => {
    this.setState({ lastName: event.target.value });
  }
  handleSexSelect = (event) => {
    console.log("select: " + event.target.value);
    this.setState({ sex: event.target.value });
  }
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  }
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  handleRPasswordChange = (event) => {
    this.setState({ rPassword: event.target.value });
  }
  handleSaveNewUser = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      error: null
    })
    const { firstName, lastName, sex, age, password } = this.state;
    setTimeout(()=>
    axios.post("http://localhost:8080/api/users", {
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      age: parseInt(age),
      password: password
    })
      .then((response) => {
        console.log("successfully create user:");
        console.log(response);
        this.setState({
          isLoading: false,
          error: null
        });
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log("create error");
        console.log(error);
        this.setState({
          isLoading: false,
          error: error
        });
      }),300);

  }
  render() {
    const { firstName, lastName, sex, age, password, rPassword, error, isLoading } = this.state;
    const showAgeReminder = age !== "" && age !== "" + parseInt(age, 10);
    const showPasswordReminder = rPassword !== "" && rPassword !== password;
    if (error) {
      return (
        <div className="createpage-container">
          <div className="create-error-container">
            <img className="error-robot" src={fatal} alt="broken robot" />
            <p className="create-error-msg">Opps, something went wrong when you trying to create user</p>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div className="createpage-container">
          <div className="create-loader-container">
            <Loader
              type="Ball-Triangle"
              color="green"
              height={80}
              width={80}
            />
            <p>Please wait while we creating the user for you.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="createpage-container">
        <form className="create-form" id="form1" onSubmit={this.handleSaveNewUser}>
          <div className="form-line">
            <h2>Create New User</h2>
          </div>
          <div className="form-line">
            <label htmlFor="fname">First Name: </label>
            <input type="text" value={firstName} onChange={this.handleFirstnameChange} id="fname" placeholder="First Name" />
          </div>
          <div className="form-line">
            <label htmlFor="lname">Last Name: </label>
            <input type="text" value={lastName} onChange={this.handleLastnameChange} id="lname" placeholder="Last Name" />
          </div>
          <div className="form-line">
            <label htmlFor="sex">Sex: </label>
            <select onChange={this.handleSexSelect} value={sex} id="sex">
              <option value="" disabled={true}>select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {showAgeReminder && <p className="age-reminder">
            age must be a number
          </p>}
          <div className="form-line">
            <label htmlFor="age">Age: </label>
            <input type="text" value={age} onChange={this.handleAgeChange} id="age" placeholder="Age" />
          </div>
          <div className="form-line">
            <label htmlFor="pword">Password: </label>
            <input type="password" value={password} onChange={this.handlePasswordChange} id="pword" placeholder="password" />
          </div>
          {showPasswordReminder && <p className="password-reminder">
            two password must be the same
          </p>}
          <div className="form-line">
            <label htmlFor="rpword">Repeat: </label>
            <input type="password" value={rPassword} onChange={this.handleRPasswordChange} id="rpword" placeholder="repeat password" />
          </div>
          <hr></hr>
          <div className="form-line">
            <input type="submit" value="Add User" id="submitBtn" />
          </div>
        </form>
      </div>
    );
  }
}
const CreatePageWithRouter = withRouter(CreatePage);
export default CreatePageWithRouter;