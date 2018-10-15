const initialState = {
    tables: [],
    tables_data: [],
    active_db: 0,
    active_table: 0,
    connections: []
};

const databaseReducer = function(state = initialState, action){
    switch(action.type){
        case "SET_TABLES":
            return Object.assign({}, state, {tables: action.tables});
        case "SET_TABLES_DATA":
            return Object.assign({}, state, {tables_data: action.tables_data});
        case "CLEAR_ALL_DB":
            state.tables_data = [];
            state.tables = [];
            return state;
        case "SET_ACTIVE_DB":
            return Object.assign({}, state, {active_db: action.index});
        case "SET_ACTIVE_TABLE":
            return Object.assign({}, state, {active_table: action.index});
        case "SET_CONNECTIONS":
            return Object.assign({}, state, {connections: action.connections});
    }
    return state;
};

export default databaseReducer;

