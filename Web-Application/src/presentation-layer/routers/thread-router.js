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
        if(request.session.isLoggedIn) {
            response.render("threads-create.hbs", { isLoggedIn: request.session.isLoggedIn })
        } else {
            response.redirect("/accounts/sign-in")
        }
        
    })

    // Create thread POST
    router.post("/create", function(request, response) {
        if(request.session.isLoggedIn) {
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
        } else {
            response.redirect("/accounts/sign-in")
        }
        
    })


    return router
}