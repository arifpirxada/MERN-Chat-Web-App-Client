const initialState = {
    logged: false,
    userData: null
}

const initialUsers = []

const selectedUser = null

const notifications = []

export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {

        case "CHANGELOGSTATUS":
            return { ...state, logged: true, userData: action.payload };

        case "LOGOUTUSER":
            return { ...state, logged: false, userData: null }

        default:
            return state;
    }
}

export const recentReducer = (state = initialUsers, action) => {
    switch (action.type) {

        case "SET_RECENT_USERS":
            return action.payload

        case "ADD_RECENT_USER":
            const checkExisting = state.filter(item => item._id === action.payload._id)
            if (!checkExisting || checkExisting.length === 0) {
                return [action.payload, ...state];
            }
            return state

        default:
            return state;
    }
}

export const selectReducer = (state = selectedUser, action) => {
    switch (action.type) {

        case "SELECT_USER":
            return { ...state, user: action.payload };

        default:
            return state;
    }
}

export const notificationReducer = (state = notifications, action) => {
    switch (action.type) {

        case "ADD_NOTIFICATION":
            return [action.payload, ...state];

        default:
            return state;
    }
}