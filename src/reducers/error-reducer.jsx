const initialState = {
    message:""
};
const errorReducer = function(state = initialState, action){
    switch(action.type){
        case "SET_ERR":
            return Object.assign({}, state, {message: action.message});
        case "CLEAR":
            return Object.assign({}, state, {message: ''});
    }
    return state;
};

export default errorReducer;