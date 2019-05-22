const initialState = {
    isLoading:false,
    error: null,
    user:{},
    passwordWrong: false
}
const editReducer = (state = initialState, action) => {
    switch(action.type){
        //---------GET-------------------
        case "GET_USER_LOADING":{
            return {
                ...state,
                error: null,
                isLoading:true,
                passwordWrong:false
            }
        }
        case "GET_USER_SUCCESS":{
            return {
                ...state,
                isLoading:false,
                error: null,
                user: action.data,
                passwordWrong:false
            }
        }
        case "GET_USER_FAIL":{
            return {
                ...state,
                isLoading: false,
                error: action.error,
                passwordWrong:false
            }
        }
        //----------EDIT----------------
        case "EDIT_USER_LOADING":{
            return {
                ...state,
                isLoading: true,
                error: null,
                passwordWrong:false
            }
        }
        case "EDIT_USER_SUCCESS":{
            return {
                ...state,
                isLoading:false,
                error: null,
                passwordWrong:false
            }
        }
        case "EDIT_USER_FAIL":{
            return {
                ...state,
                isLoading:false,
                error:action.error,
                passwordWrong:false
            }
        }
        case "SET_PASSWORD_WRONG":{
            return {
                ...state,
                isLoading:false,
                error: null,
                passwordWrong:true
            }
        }
        case "CLEAR_PASSWORD_WRONG":{
            console.log("weird");
            return {
                ...state,
                isLoading:false,
                error:null,
                passwordWrong:false
            }
        }
        default:{
            return state;
        }
    }
}
export default editReducer;