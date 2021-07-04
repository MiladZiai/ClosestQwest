exports.getErrorsNewThread = function(thread) {

    const errors = []
    // Validate threadName.
    if (thread.name.length < 1) {
        errors.push("Thread Name Too Short")
    } else if (thread.name && 50 < thread.name.length) {
        errors.push("Thread Name Too Long")
    }
    return errors
}