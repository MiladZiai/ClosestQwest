const express = require('express')

module.exports = function({ threadManager }) {

    const router = express.Router()

    // Get all threads
    router.get("/", function(request, response) {
        threadManager.getAllThreads(function(errors, threads) {
            const model = {
                errors: errors,
                threads: threads,
                isLoggedIn: request.session.isLoggedIn
            }
            response.render("threads.hbs", model)
        })
    })

    // Create thread GET
    router.get("/create", function(request, response) {
        response.render("threads-create.hbs", { isLoggedIn: request.session.isLoggedIn })
    })

    // Create thread POST
    router.post("/create", function(request, response) {
        const thread = {
            name: request.body.name,
        }

        threadManager.createThread(thread, function(errors) {
            if (errors.length == 0) {
                response.redirect("/threads")
            } else {
                const model = {
                    errors: errors,
                    thread: thread,
                    name: request.body.name,
                    isLoggedIn: request.session.isLoggedIn
                }
                response.render("threads-create.hbs", model)
            }
        })
    })


    return router
}