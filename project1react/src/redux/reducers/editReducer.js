const initialState = {
    isLoading:false,
    error: null,
    user:{}
}
const editReducer = (state = initialState, action) => {
    switch(action.type){
        //---------GET-------------------
        case "GET_USER_LOADING":{
            return {
                ...state,
                error: null,
                isLoading:true
            }
        }
        case "GET_USER_SUCCESS":{
            return {
                ...state,
                isLoading:false,
                error: null,
                user: action.data
            }
        }
        case "GET_USER_FAIL":{
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        }
        //----------EDIT----------------
        case "EDIT_USER_LOADING":{
            return {
                ...state,
                isLoading: true,
                error: null
            }
        }
        case "EDIT_USER_SUCCESS":{
            return {
                ...state,
                isLoading:false,
                error: null
            }
        }
        case "EDIT_USER_FAIL":{
            return {
                ...state,
                isLoading:false,
                error:action.error
            }
        }
        default:{
            return state;
        }
    }
}
export default editReducer;