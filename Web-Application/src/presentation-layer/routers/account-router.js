const express = require('express')
//const errorMessages = require('../../business-logic-layer/error-messages')

module.exports = function({ accountManager }) {

    const router = express.Router()

    router.get("/", function(request, response) {

        accountManager.getAllAccounts(function(errors, accounts) {
            const model = {
                errors: errors,
                accounts: accounts,
                isLoggedIn: request.session.account
            }
            response.render("accounts.hbs", model)
        })
    })

    router.get("/sign-up", function(request, response) {
        response.render("accounts-sign-up.hbs")
    })

    router.post("/sign-up", function(request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.createAccount(account, function(errors) {
            if (errors.length == 0) {
                request.session.isLoggedIn = true
                response.render("home.hbs", { isLoggedIn: request.session.isLoggedIn })
            } else {
                const model = {
                    errors: errors,
                    username: request.body.username,
                    password: request.body.password
                }
                response.render("accounts-sign-up.hbs", model)
            }
        })
    })

    router.get("/sign-in", function(request, response) {
        response.render("accounts-sign-in.hbs")
    })

    router.post("/sign-in", function(request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.signInAccount(account, function(errors, account) {
            if (errors.length == 0) {
                request.session.account = account
                request.session.isLoggedIn = true
                response.redirect("/")
            } else {
                const model = {
                    errors: errors,
                    username: request.body.username,
                    password: request.body.password,
                }
                response.render("accounts-sign-in.hbs", model)
            }
        })
    })

    router.post("/logout", function(request, response) {
        request.session.destroy(function() {
            response.redirect("/")
        })
    })

    return router
}