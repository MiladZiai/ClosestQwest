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

    exports.editThreadById = function(thread, callback) {

        // Validate the thread.
        const errors = threadValidator.getErrorsNewThread(thread)
        if (0 < errors.length) {
            callback(errors, null)
            return
        }
        threadRepository.editThreadById(thread, callback)
    }

    exports.deleteThreadById = function(thread, callback) {
        threadRepository.deleteThreadById(thread, callback)
    }

    return exports
}