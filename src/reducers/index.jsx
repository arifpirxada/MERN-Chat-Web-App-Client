import { combineReducers } from "redux"
import { registrationReducer, recentReducer, selectReducer, notificationReducer } from "./reducers"

const rootReducer = combineReducers({
    registration: registrationReducer,
    recentUsers: recentReducer,
    selected: selectReducer,
    notifications: notificationReducer
})

export default rootReducer