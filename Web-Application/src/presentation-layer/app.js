const express = require('express')
const expressSession = require('express-session')
const expressHandlebars = require('express-handlebars')
const redis = require('redis')
const redisClient = redis.createClient({ host: 'redis' })
const redisStore = require('connect-redis')(expressSession)
const path = require('path')

module.exports = function({ variousRouter, 
                            accountRouter, 
                            threadRouter, 
                            postRouter, 
                            accountRouterApi, 
                            threadRouterApi
                        }) {

    const app = express()

    // Handle all static files
    app.use(express.static(path.join(__dirname, "../../../Single-Page-Application")))

    // Setup express-handlebars.
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.set("views", path.join(__dirname, "views"))

    app.use(function(request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        next()
    })

    app.engine("hbs", expressHandlebars({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "/layouts")
    }))

    app.use(expressSession({
        store: new redisStore({ client: redisClient }),
        secret: "keyboard dog",
        resave: false,
        saveUninitialized: true
    }))

    // Attach all the routers.
    app.use("/", variousRouter)
    app.use("/accounts", accountRouter)
    app.use("/api/accounts", accountRouterApi)
    app.use("/threads", threadRouter)
    app.use("/api/threads", threadRouterApi)
    app.use("/posts", postRouter)

    return app

}