
export function setTables(tables) {
    return{
        type: "SET_TABLES",
        tables
    }
}

export function setTablesData(tables_data) {
    return{
        type: "SET_TABLES_DATA",
        tables_data
    }
}


export function clearAllTables() {
    return{
        type: "CLEAR_ALL_DB"
    }
}

export function setActiveDB(index) {
    return{
        type: "SET_ACTIVE_DB",
        index
    }
}

export function setActiveTable(index) {
    return{
        type: "SET_ACTIVE_TABLE",
        index
    }
}

export function setConnections(connections) {
    return{
        type: "SET_CONNECTIONS",
        connections
    }
}