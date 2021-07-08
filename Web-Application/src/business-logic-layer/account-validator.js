exports.getErrorsNewAccount = function(account) {

    const errors = []
    const minUsernameLen = 6
    const maxUsernameLen = 50
    const minPasswordLen = 6
    const maxPasswordLen = 20

    // Validate username.
    if (!(/\w+/).test(account.username)) {
        errors.push("Username Missing")
        return errors
    } else if ((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(account.username)) { //regex that does not allow special characters 
        errors.push("Username Contains Invalid Characters")
        return errors
    } else if (account.username.length < minUsernameLen) {
        errors.push("Username Too Short")
    } else if (maxUsernameLen < account.username.length) {
        errors.push("Username Too Long")
    }

    // Validate password.
    if (!(/\w+/).test(account.password)) {
        errors.push("Password Missing")
    } else if (account.password.length < minPasswordLen || maxPasswordLen < account.password.length) {
        errors.push("Password Too Short or Too Long")
    }

    return errors

}