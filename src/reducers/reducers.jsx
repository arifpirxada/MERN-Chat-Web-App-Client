const initialState = {
    logged: false
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SIGNUP":
            console.log(action.payload)
            return {...state, logged: true};

        case "LOGIN":
            console.log(action.payload)
            return {...state, logged: true};

        default:
            return state;
    }
}

export default registrationReducer