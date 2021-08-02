module.exports = function({ SQLiteDb }){
    return {
        getAllAccounts: function(callback) {
            SQLiteDb.account.findAll({ raw: true })
                .then(accounts => callback([], accounts))
                .catch(error => callback(['internalError'], null))
        },

        createAccount: function(account, callback) {
            SQLiteDb.account.create({ username: account.username, password: account.password })
                .then(account => {
                    account = {
                        insertId: account.dataValues.accountId
                    }
                    callback(null, account) 
                })
                .catch(error => {error, null})
        },

        getUsernameById: function(account, callback) {
            SQLiteDb.account.findOne({ where: { username: account.username }, raw: true })
                .then(account => callback([], account))
                .catch(error => callback(error, null))
        }
    }
}