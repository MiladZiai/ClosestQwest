exports.getErrorsNewAccount = function(account) {

    const errors = []
    const minUsernameLen = 6
    const maxUsernameLen = 50
    const minPasswordLen = 6
    const maxPasswordLen = 20

    // Validate username.
    if (!(/\w+/).test(account.username)) {
        errors.push("usernameMissing")
        return errors
    } else if ((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(account.username)) { //regex that does not allow special characters 
        errors.push("usernameInvalidCharacters")
        return errors
    } else if (account.username.length < minUsernameLen) {
        errors.push("username Too Short")
    } else if (maxUsernameLen < account.username.length) {
        errors.push("username Too Long")
    }

    // Validate password.
    if (!(/\w+/).test(account.password)) {
        errors.push("password Missing")
    } else if (account.password.length < minPasswordLen || maxPasswordLen < account.password.length) {
        errors.push("password Length Error")
    }

    return errors

}