export function setUserId(id){
    return {
        type: "SET_USER_ID",
        id
    }
}

export function clearUserId(){
    return {
        type: "CLEAR_USER_ID"
    }
}