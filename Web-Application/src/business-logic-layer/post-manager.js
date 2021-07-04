const postValidator = require('./post-validator')

module.exports = function({ postRepository }) {

    const exports = {}

    exports.getAllPosts = function(thread, callback) {
        postRepository.getAllPosts(thread, function(error, posts) {
            callback(error, posts)
        })
    }

    exports.createPost = function(post, callback) {
        // Validate the post.
        const errors = postValidator.getErrorsNewPost(post)

        if (0 < errors.length) {
            callback(errors)
            return
        } else {
            postRepository.createPost(post, callback)
        }
    }

    return exports
}