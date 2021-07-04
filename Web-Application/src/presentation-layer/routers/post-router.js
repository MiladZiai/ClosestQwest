const express = require('express')

module.exports = function({ postManager }) {

    const router = express.Router()

    // Get all posts from thread with threadId specified in params
    router.get("/:id", function(request, response) {
        const threadId = request.params.id

        postManager.getAllPosts(threadId, function(errors, posts) {
            const model = {
                errors: errors,
                posts: posts,
                threadId: threadId,
                threadName: posts.threadName,
                isLoggedIn: request.session.isLoggedIn
            }
            response.render("posts.hbs", model)
        })
    })

    // Create post for club specified in param GET
    router.get("/create/:id", function(request, response) {
        const model = {
            threadId: request.params.id,
            isLoggedIn: request.session.isLoggedIn
        }
        response.render("posts-create.hbs", model)
    })

    // Create post for thread specified in params POST
    router.post("/create/:id", function(request, response) {
        const post = {
            title: request.body.title,
            content: request.body.content,
            postOnThread: request.params.id,
            postOfAccount: request.session.account.accountId
        }
        
        postManager.createPost(post, function(errors) {
            if (errors.length == 0) {
                response.redirect(`/posts/${request.params.id}`)
            } else {
                const model = {
                    errors: errors,
                    postOnThread: request.params.id,
                    title: request.body.title,
                    content: request.body.content,
                    isLoggedIn: request.session.isLoggedIn
                }
                response.render("posts-create.hbs", model)
            }
        })
    })

    return router

}