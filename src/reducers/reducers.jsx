const initialState = {
    logged: false,
    userData: null
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {

        case "CHANGELOGSTATUS":
            return {...state, logged: true, userData: action.payload};
        
        case "LOGOUTUSER":
            return {...state, logged: false, userData: null}

        default:
            return state;
    }
}

export default registrationReducer