import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import fatal from '../assets/fatal.png';
import { createUser } from '../redux/actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      sex: "",
      age: "",
      password: "",
      rPassword: ""
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
    const { firstName, lastName, sex, age, password } = this.state;
    this.props.createUser({
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      age: parseInt(age),
      password: password
    }, this.props.history);
  }
  render() {
    const { firstName, lastName, sex, age, password, rPassword } = this.state;
    const { error, isLoading } = this.props;
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
const mapStateToProps = (state) => {
  return {
    isLoading: state.createReducer.isLoading,
    error: state.createReducer.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (newUser, history) => dispatch(createUser(newUser, history))
  }
}
const CreatePageWithRouter = withRouter(CreatePage);
export default connect(mapStateToProps, mapDispatchToProps)(CreatePageWithRouter);