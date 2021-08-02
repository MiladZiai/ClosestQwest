const express = require('express')

module.exports = function({ postManager }) {

    const router = express.Router()

    // Get all posts in a thread
    router.get('/', function(request, response) {

        const threadId = request.body.threadId

        postManager.getAllPosts(threadId, function(errors, posts) {
            if(errors.length == 0) {
                const model = {
                    posts: posts,
                    threadId: threadId
                }
                response.status(200).json(model)
            } else {
                response.status(400).json( {
                    message: "Bad request",
                    errors: errors
                })
            }
        })
    })

    return router
}