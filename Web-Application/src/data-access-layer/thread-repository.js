module.exports = function({ MySQLDb }) {

    exports.getAllThreads = function(callback) {
        const query = `SELECT * FROM thread ORDER BY threadId`

        MySQLDb.query(query, function(error, threads) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback(null, threads)
            }
        })
    }

    exports.createThread = function(thread, callback) {
        const query = `INSERT INTO thread (threadName, threadOfAccount) VALUES (?, ?)`
        const values = [thread.name, thread.threadOfAccount]

        MySQLDb.query(query, values, function(error) {
            if (error) {
                if (error.sqlMessage.includes("nameUnique")) {
                    callback(['thread exisists'])
                } else {
                    callback(['internalError'])
                }
            } else {
                callback([])
            }
        })
    }

    return exports

}