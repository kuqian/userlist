import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import fatal from '../assets/fatal.png';
import { getUser } from '../redux/actions';
import { editUser } from '../redux/actions';
import { setPasswordWrong, clearPasswordWrong } from '../redux/actions';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router-dom';

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            sex: "",
            age: "",
            password: "",
            rPassword: "",
            initUser: this.props.initUser
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.props.getUser(this.props.match.params.user_id);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.initUser !== this.state.initUser) {
            console.log("componentDidUpdate, find difference");
            const { firstName, lastName, sex, age } = this.state.initUser;
            this.setState({
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                age: "" + age
            });
        } else {
            console.log("componentDidUpdate, no difference");
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.initUser !== prevState.initUser) {
            console.log("getDerivedStateFromProps, find difference");
            return { initUser: nextProps.initUser };
        } else {
            console.log("getDerivedStateFromProps, no difference");
        }
        return null;
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
    handlePasswordFocus = () => {
        console.log("password focus");
        this.props.clearPasswordWrong();
    }
    handleSaveEditUser = (event) => {
        event.preventDefault();
        //console.log("wtf");
        const { firstName, lastName, sex, age, password } = this.state;
        this.props.editUser({
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            age: parseInt(age),
            password: password,
            _id: this.state.initUser._id
        }, this.props.history);
    }
    render() {
        const { firstName, lastName, sex, age, password, rPassword } = this.state;
        const { error, isLoading, passwordWrong } = this.props;
        const showAgeReminder = age !== "" && age !== "" + parseInt(age, 10);
        const showPasswordReminder = rPassword !== "" && rPassword !== password;
        if (error) {
            return (
                <div className="editpage-container">
                    <div className="edit-error-container">
                        <img className="error-robot" src={fatal} alt="broken robot" />
                        <p className="edit-error-msg">Oops, something went wrong when you trying to edit user</p>
                    </div>
                </div>
            );
        } else if (isLoading) {
            return (
                <div className="editpage-container">
                    <div className="edit-loader-container">
                        <Loader
                            type="Ball-Triangle"
                            color="green"
                            height={80}
                            width={80}
                        />
                        <p>Please wait while we editing the user for you.</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="editpage-container">
                <form className="edit-form" id="form2" onSubmit={this.handleSaveEditUser}>
                    <div className="form-line">
                        <h2>Edit User</h2>
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
                        <input type="password" value={password} onChange={this.handlePasswordChange} id="pword" placeholder="password" onFocus={this.handlePasswordFocus}/>
                    </div>
                    {showPasswordReminder && <p className="password-reminder">
                        two password must be the same
          </p>}
                    {passwordWrong && <p className="password-reminder">
                        Your password is wrong, please try again
          </p>}
                    <div className="form-line">
                        <label htmlFor="rpword">Repeat: </label>
                        <input type="password" value={rPassword} onChange={this.handleRPasswordChange} id="rpword" placeholder="repeat password" />
                    </div>
                    <hr></hr>
                    <div className="form-line">
                        <input type="submit" value="Save Change" id="submitBtn" />
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.editReducer.isLoading,
        error: state.editReducer.error,
        initUser: state.editReducer.user,
        passwordWrong: state.editReducer.passwordWrong
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (user_id) => dispatch(getUser(user_id)),
        editUser: (editedUser, history) => dispatch(editUser(editedUser, history)),
        setPasswordWrong: () => dispatch(setPasswordWrong()),
        clearPasswordWrong: () => dispatch(clearPasswordWrong())
    }
}
const EditPageWithRouter = withRouter(EditPage);
export default connect(mapStateToProps, mapDispatchToProps)(EditPageWithRouter);