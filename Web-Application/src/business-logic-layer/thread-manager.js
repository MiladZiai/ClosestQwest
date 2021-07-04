const threadValidator = require('./thread-validator')

module.exports = function({ threadRepository }) {

    const exports = {}

    exports.getAllThreads = function(callback) {
        threadRepository.getAllThreads(callback)
    }

    exports.createThread = function(thread, callback) {

        // Validate the thread.
        const errors = threadValidator.getErrorsNewThread(thread)

        if (0 < errors.length) {
            callback(errors, null)
            return
        }
        threadRepository.createThread(thread, callback)

    }

    return exports
}