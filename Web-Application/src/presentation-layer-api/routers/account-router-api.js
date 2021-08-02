const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../../../config/index')


module.exports = function({ accountManager }) {

    const router = express.Router()

    router.post("/sign-up", function(request, response) {
        const account = {
            username: request.body.username,
            password: request.body.password
        }

        accountManager.createAccount(account, function(errors, account) {
            if (errors.length == 0) {
                response.status(201).json({ 
                    message: "created!",
                    id: account.insertId,
                    location: "/api/accounts/"
                })
            } else {
                response.status(400).json({ message: "Bad Request" })
            }
        })

    })

    router.post("/sign-in", function(request, response) {
        if (request.body.grant_type != "password") {
            response.status(400).json({ message: "unsupported_grant_type" })
            return
        } else {
            const account = {
                username: request.body.username,
                password: request.body.password
            }
    
            accountManager.signInAccount(account, function(errors, account) {
                if (errors.length == 0) {
                    const accountCredentials = {
                        username: account.username,
                        accountId: account.accountId
                    }

                    const token = jwt.sign(accountCredentials, config.JWT_KEY, { expiresIn: "1h" })

                    response.status(200).json({ 
                        message: "Auth successful",
                        id_token: token
                    })

                } else {
                    response.status(401).json({
                        message: 'Auth failed!',
                        WWWAuthenticate: "OAuth2 realm=accounts"
                    })
                }
            })
        }
    })

    return router
}