
export function setErr(message) {
    return{
        type: "SET_ERR",
        message
    }
}

export function clearErr() {
    return{
        type: "CLEAR",
    }
}