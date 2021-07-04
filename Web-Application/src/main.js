const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    accountRepository: awilix.asFunction(require('./data-access-layer/account-repository')),
    accountManager: awilix.asFunction(require('./business-logic-layer/account-manager')),
    accountRouter: awilix.asFunction(require('./presentation-layer/routers/account-router')),
    //accountRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/account-router-api')),
    threadRepository: awilix.asFunction(require('./data-access-layer/thread-repository')),
    threadManager: awilix.asFunction(require('./business-logic-layer/thread-manager')),
    threadRouter: awilix.asFunction(require('./presentation-layer/routers/thread-router')),
    //clubRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/club-router-api')),
    postRepository: awilix.asFunction(require('./data-access-layer/post-repository')),
    postManager: awilix.asFunction(require('./business-logic-layer/post-manager')),
    postRouter: awilix.asFunction(require('./presentation-layer/routers/post-router')),
    //postRouterApi: awilix.asFunction(require('./presentation-layer-api/backend/routers/post-router-api')),
    variousRouter: awilix.asFunction(require('./presentation-layer/routers/various-router')),
    app: awilix.asFunction(require('./presentation-layer/app'))

})

const app = container.resolve("app")

app.listen(8080)