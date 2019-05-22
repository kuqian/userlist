import axios from 'axios';
export const getUsersSuccess = (data) => {
    return {
        type: "GET_USERS_SUCCESS",
        data: data
    }
}
export const getUsersFail = (error) => {
    return {
        type: "GET_USERS_FAIL",
        error: error
    }
}
export const getUsersLoading = () => {
    return {
        type: "GET_USERS_LOADING",
    }
}
export const getUsers = () => {
    return (dispatch) => {
        dispatch(getUsersLoading());
        axios.get("http://localhost:8080/api/users")
            .then((res) => {
                dispatch(getUsersSuccess(res.data));
            })
            .catch((error) => {
                dispatch(getUsersFail(error));
            })
    }
}
export const deleteUser = (userID) => {
    return (dispatch) => {
        dispatch(getUsersLoading());
        axios.delete(`http://localhost:8080/api/users/${userID}`, {})
            .then((response) => {
                console.log(response);
                dispatch(getUsers());
            })
            .catch((error) => {
                console.log(error);
                dispatch(getUsersFail(error));
            });
    }
}
//--------------create user----------------------------------------------
export const createUserLoading = () => {
    return {
        type: "CREATE_USER_LOADING"
    }
}
export const createUserSuccess = () => {
    return {
        type: "CREATE_USER_SUCCESS"
    }
}
export const createUserFail = (error) => {
    return {
        type: "CREATE_USER_FAIL",
        error: error
    }
}
export const createUser = (newUser, history) => {
    return (dispatch) => {
        dispatch(createUserLoading());
        axios.post("http://localhost:8080/api/users", newUser)
            .then((response) => {
                console.log("successfully create user:");
                console.log(response);
                dispatch(createUserSuccess());
                history.push('/');
            })
            .catch((error) => {
                console.log("create encounter error");
                console.log(error);
                dispatch(createUserFail(error));
            });
    }
}
//--------------------Edit User------------------------------
export const getUserLoading = () => {
    return {
        type: "GET_USER_LOADING"
    }
}
export const getUserSuccess = (user) => {
    return {
        type: "GET_USER_SUCCESS",
        data: user
    }
}
export const getUserFail = (error) => {
    return {
        type: "GET_USER_FAIL",
        error: error
    }
}
export const getUser = (user_id) => {
    return (dispatch) => {
        dispatch(getUserLoading());
        axios.get(`http://localhost:8080/api/users/${user_id}`)
            .then((response) => {
                console.log(response.data);
                setTimeout(() => dispatch(getUserSuccess(response.data)), 100);
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
                dispatch(getUserFail(error));
            });
    }
}

export const editUserLoading = () => {
    return {
        type: "EDIT_USER_LOADING"
    }
}
export const editUserSuccess = () => {
    return {
        type: "EDIT_USER_SUCCESS"
    }
}
export const editUserFail = (error) => {
    return {
        type: "EDIT_USER_FAIL",
        error: error
    }
}
export const editUser = (editedUser, history) => {
    console.log(editedUser);
    return (dispatch) => {
        dispatch(editUserLoading());
        axios.put(`http://localhost:8080/api/users/${editedUser._id}`, editedUser)
            .then((response) => {
                console.log(response);
                console.log(response.status);
                if (response.status === 206) {
                    const newError = new Error("password wrong");
                    newError.status = 206;
                    throw newError;
                } else {
                    dispatch(editUserSuccess());
                    history.push("/");
                }

            })
            .catch((error) => {
                console.log("Error: test");
                console.log(typeof (error));
                console.log((Object.keys(error)));
                if (error.status) {
                    dispatch(setPasswordWrong());
                } else {
                    dispatch(editUserFail(error));
                }
            });
    }
}
export const setPasswordWrong = () => {
    return {
        type: "SET_PASSWORD_WRONG"
    }
}
export const clearPasswordWrong = () => {
    return {
        type: "CLEAR_PASSWORD_WRONG"
    }
}