const db = require('./db')

module.exports = function() {

    /*
    Retrieves all threads ordered by threadId
    Possible errors: internalError
    Success value: The fetched threads in an array.
    */
    exports.getAllThreads = function(callback) {

        const query = `SELECT * FROM thread ORDER BY threadId`

        db.query(query, function(error, threads) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback(null, threads)
            }
        })
    }

    /*
    	Creates a new thread.
    	thread: {name: "The name of the thread"}
    	Possible errors: internalError, thread exisists
    	Success value: New thread was created.
    */
    exports.createThread = function(thread, callback) {
        const query = `INSERT INTO thread (threadName) VALUES (?)`

        db.query(query, thread.name, function(error) {
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