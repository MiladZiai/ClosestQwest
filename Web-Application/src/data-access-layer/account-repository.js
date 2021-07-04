const db = require('./db')

module.exports = function() {

    exports.getAllAccounts = function(callback) {

        const query = `SELECT username FROM account ORDER BY username`

        db.query(query, function(error, accounts) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], accounts)
            }
        })

    }

    exports.createAccount = function(account, callback) {

        const query = `INSERT INTO account (username, password) VALUES (?, ?)`
        const values = [account.username, account.password]

        db.query(query, values, function(error) {
            callback(error)
        })
    }

    exports.signInAccount = function(account, callback) {
        const query = `SELECT * FROM account WHERE username = ?`

        db.query(query, account.username, function(error, accounts) {
            if (error) {
                callback(error, null)
            } else {
                callback([], accounts[0])
            }
        })
    }

    return exports

}