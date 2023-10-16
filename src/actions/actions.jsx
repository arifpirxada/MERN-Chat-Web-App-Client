export const signup = (userData) => ({
    type: "SIGNUP",
    payload: userData
})

export const login = (userData) => ({
    type: "LOGIN",
    payload: userData
})