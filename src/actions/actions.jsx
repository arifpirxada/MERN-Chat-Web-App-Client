export const changeLogStatus = (userData) => ({
    type: "CHANGELOGSTATUS",
    payload: userData
})

export const logoutUser = () => ({
    type: "LOGOUTUSER",
})

export const addRecentUser = (userData) => ({
    type: "ADD_RECENT_USER",
    payload: userData
})

export const setRecentUsers = (users) => ({
    type: "SET_RECENT_USERS",
    payload: users
})

export const selectUser = (userData) => ({
    type: "SELECT_USER",
    payload: userData
})

export const addNotification = (notification) => ({
    type: "ADD_NOTIFICATION",
    payload: notification
})