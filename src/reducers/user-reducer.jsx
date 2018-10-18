const initialState = {
    user_id:''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_ID":
            return Object.assign({},state,{user_id: action.id});
        case "CLEAR_USER_ID":
            return Object.assign({},state,{user_id: ''});
    }
    return state;
};

export default userReducer;