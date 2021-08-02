const express = require('express')
const checkAuth = require('../middleware/check-auth')

module.exports = function({ threadManager }) {

    const router = express.Router()

    router.get("/", function(request, response) {
        threadManager.getAllThreads(function(errors, threads) {
            const model = {
                errors: errors,
                threads: threads
            }
            response.status(200).json(model)
        })
    })

    router.get("/create", checkAuth, function(request, response) {
        response.status(204).json()
    })

    router.post("/create", checkAuth, function(request, response) {
        const thread = {
            name: request.body.name,
            threadOfAccount: request.body.threadOfAccount
        }
        
        threadManager.createThread(thread, function(errors) {
            if (errors.length == 0) {
                response.status(201).json({ 
                    message: "created!",
                    name: request.body.name,
                    threadOfAccount: request.body.threadOfAccount,
                    location: "/api/threads/"
                })
            } else {
                response.status(400).json({
                    message: "Bad Request",
                    name: request.body.name
                })
            }
        })
    })

    /*
    router.put("/updateThread", checkAuth, function(request, response) {
        const threadOfAccount = request.body.threadOfAccount

        
    })
    
    router.delete("/delete", function(request, response) {
        const threadOfAccount = request.body.threadOfAccount

    })
    */

    return router
}