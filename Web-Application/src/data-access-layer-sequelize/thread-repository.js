module.exports = function({ SQLiteDb }){
    return {
        getAllThreads: function(callback) {
            SQLiteDb.thread.findAll({ raw: true })
                .then(threads => callback(null, threads))
                .catch(error => callback(['internalError'], null))
        },

        createThread: function(thread, callback) {
            SQLiteDb.thread.create({ threadName: thread.name, threadOfAccount: thread.threadOfAccount})
                .then(thread => callback([]))
                .catch(error => {
                    if (error instanceof UniqueConstraintError) {
                        callback(['thread exisists'])
                    } else {
                        callback(['internalError'])
                    }
                })
        }
    }
}