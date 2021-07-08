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
        const query = `INSERT INTO thread (threadName) VALUES (?)`

        MySQLDb.query(query, thread.name, function(error) {
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