const initialState = {
    users:[],
    isLoading: false,
    error: null
}
const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_USERS_LOADING":{
            console.log("inside reducer, get user loading");
            return {
                ...state,
                isLoading: true
            }
        }
        case "GET_USERS_SUCCESS":{
            console.log("inside reducer, get users success");
            return {
                ...state,
                isLoading: false,
                users:action.data
            }
        }
        case "GET_USERS_FAIL":{
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        } 
        default:{
            return state;
        }
    }
}
export default usersReducer;