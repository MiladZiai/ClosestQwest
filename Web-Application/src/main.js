const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    //presentation-layer
    accountRouter: awilix.asFunction(require('./presentation-layer/routers/account-router')),
    threadRouter: awilix.asFunction(require('./presentation-layer/routers/thread-router')),
    postRouter: awilix.asFunction(require('./presentation-layer/routers/post-router')),
    variousRouter: awilix.asFunction(require('./presentation-layer/routers/various-router')),

    //presentation-layer-API
    accountRouterApi: awilix.asFunction(require('./presentation-layer-api/routers/account-router-api')),
    threadRouterApi: awilix.asFunction(require('./presentation-layer-api/routers/thread-router-api')),
    postRouterApi: awilix.asFunction(require('./presentation-layer-api/routers/post-router-api')),

    //business-logic-layer
    accountManager: awilix.asFunction(require('./business-logic-layer/account-manager')),
    threadManager: awilix.asFunction(require('./business-logic-layer/thread-manager')),
    postManager: awilix.asFunction(require('./business-logic-layer/post-manager')),
    
    //data-access-layer
    accountRepository: awilix.asFunction(require('./data-access-layer/account-repository')),
    threadRepository: awilix.asFunction(require('./data-access-layer/thread-repository')),
    postRepository: awilix.asFunction(require('./data-access-layer/post-repository')),
    
    //data-access-layer-sequelize
    /*accountRepository: awilix.asFunction(require('./data-access-layer-sequelize/account-repository')),
    threadRepository: awilix.asFunction(require('./data-access-layer-sequelize/thread-repository')),
    postRepository: awilix.asFunction(require('./data-access-layer-sequelize/post-repository')),*/
    
    //MySQLDb
    MySQLDb: awilix.asValue(require('./data-access-layer/db')),
    
    //SQLiteDb
    SQLiteDb: awilix.asValue(require('./data-access-layer-sequelize/SQLiteDb')),

    app: awilix.asFunction(require('./presentation-layer/app'))
})

const app = container.resolve("app")

app.listen(80)