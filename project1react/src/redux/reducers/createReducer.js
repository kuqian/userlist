const initialState = {
    isLoading: false,
    error:null,
    isComplete:false
}
const createReducer = (state = initialState, action) => {
    switch(action.type){
        case "CREATE_USER_FAIL":{
            return{
                ...state,
                isLoading:false,
                error: action.error,
                isComplete:false
            }
        }
        case "CREATE_USER_LOADING":{
            return{
                ...state,
                isLoading:true,
                error:null,
                isComplete:false
            }
        }
        case "CREATE_USER_SUCCESS":{
            return{
                ...state,
                isLoading:false,
                error:null,
                isComplete:true
            }
        }
        default:{
            return state;
        }
    }
}
export default createReducer;
