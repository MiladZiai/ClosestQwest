module.exports = function({ MySQLDb }) {

    exports.getAllAccounts = function(callback) {
        const query = `SELECT username FROM account ORDER BY username`

        MySQLDb.query(query, function(error, accounts) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], accounts)
            }
        })

    }

    exports.createAccount = function(account, callback) {
        const query = `INSERT INTO account (username, password) VALUES (?, ?); SELECT LAST_INSERT_ID();`
        const values = [account.username, account.password]

        MySQLDb.query(query, values, function(error, accountId) {
            callback(error, accountId[0])
        })
    }

    exports.getUsernameById = function(account, callback) {
        const query = `SELECT * FROM account WHERE username = ?`

        MySQLDb.query(query, account.username, function(error, accounts) {
            if (error) {
                callback(error, null)
            } else {
                callback([], accounts[0])
            }
        })
    }

    return exports

}