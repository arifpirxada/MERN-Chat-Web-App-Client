import { combineReducers } from "redux" 
import registrationReducer from "./reducers"

const rootReducer = combineReducers({
    registration: registrationReducer
})

export default rootReducer