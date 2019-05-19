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
                setTimeout(() => { dispatch(getUsersSuccess(res.data)); }, 300);
            })
            .catch((error) => {
                dispatch(getUsersFail(error));
            })
    }
}
//------------------------------------------------------------
export const createUserLoading = () => {
    return {
        type: "CREATE_USER_LOADING"
    }
}
export const createUser = (newUser) => {
    return (dispatch) => {
        dispatch(createUserLoading());
        axios.post("http://localhost:8080/api/users", newUser)
            .then((response) => {
                console.log("successfully create user:");
                console.log(response);

            })
            .catch((error) => {
                console.log("create encounter error");
                console.log(error);
            });
    }
}