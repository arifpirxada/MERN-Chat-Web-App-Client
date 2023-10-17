export const changeLogStatus = (userData) => ({
    type: "CHANGELOGSTATUS",
    payload: userData
})

export const logoutUser = () => ({
    type: "LOGOUTUSER",
})