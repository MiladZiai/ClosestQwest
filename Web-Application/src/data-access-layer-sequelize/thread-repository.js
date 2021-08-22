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
        },

        editThreadById: function(thread, callback) {
            const threadId = thread.threadId
            const threadName = thread.name
            SQLiteDb.thread.findOne({ where: { threadId: threadId } })
                .then(function(thread) {
                    if(thread) {
                        thread.update({ 
                            threadName: threadName
                        })
                        .then(callback([]))
                        .catch(error => callback(['internalError']))
                    }
                })
        },

        deleteThreadById: function(thread, callback) {
            const threadId = thread.threadId
            SQLiteDb.thread.destroy({ where: { threadId }, raw: true })
                .then(callback([]))
                .catch(error => callback(['internalError']))
        }
    }
}