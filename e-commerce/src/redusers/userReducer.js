function userReducer(state = {}, action) {
    if(action.type === "user_signin_success" || action.type === "user_register_success") {
        return {userInfo: action.payload}
    }
    else if(action.type === "user_signin_failed" || action.type === "user_register_failed"){
        return {error: action.payload}
    }
    else if(action.type === "user_logout"){
        return {}
    }
    else {
        return state;
    }
}

export default userReducer
