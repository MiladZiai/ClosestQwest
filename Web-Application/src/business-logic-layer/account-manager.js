const accountValidator = require('./account-validator')
const bcrypt = require('bcrypt')
//const { saltRounds } = require('./commons')

module.exports = function({ accountRepository }) {

    const exports = {}

    exports.getAllAccounts = function(callback) {
        accountRepository.getAllAccounts(callback)
    }

    exports.createAccount = function(account, callback) {

        // Validate the account.
        const errors = accountValidator.getErrorsNewAccount(account)

        if (errors.length > 0) {
            callback(errors)
            return
        } else {
            bcrypt.hash(account.password, 10, function(error, hash) {
                if (error) {
                    callback("Failed to hash password!")
                    return
                } else {
                    account.password = hash
                    accountRepository.createAccount(account, function(error) {
                        if (error) {
                            if (error.sqlMessage.includes("usernameUnique")) {
                                callback(['usernameTaken'])
                            } else {
                                console.log(error);
                                callback(['Could not create account'])
                            }
                        } else {
                            callback([])
                        }
                    })
                }
            })
        }
    }

    exports.signInAccount = function(account, callback) {

        const errors = []

        accountRepository.signInAccount(account, function(dbErrors, dbAccount) {
            if (!dbAccount) {
                errors.push("account Missing")
            } else if (dbErrors.length > 0) {
                errors.push("internal Error")
            }

            if (errors.length > 0) {
                callback(errors, null)
                return
            } else {
                bcrypt.compare(account.password, dbAccount.password, function(hashError, result) {
                    if (hashError) {
                        errors.push("internal Error")
                    } else if (!result) {
                        errors.push("password Incorrect")
                    }
                    callback(errors, dbAccount)
                })
            }
        })
    }

    return exports

}