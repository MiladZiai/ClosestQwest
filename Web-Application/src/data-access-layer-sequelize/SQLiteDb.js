const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite::memory:') 

//Test the DB Connection
sequelize.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error: ', err))

// account model
sequelize.define('account', {
    accountId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    username: { 
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

// thread model
sequelize.define('thread', {
    threadId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    threadName: { 
        type: Sequelize.STRING
    },
    threadOfAccount: {
        type: Sequelize.INTEGER
    }
})

// post model
sequelize.define('post', {
    postId: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    postTitle: { 
        type: Sequelize.STRING
    },
    postContent:{
        type: Sequelize.TEXT,
        unique: true
    },
    postOnThread: {
        type: Sequelize.INTEGER
    },
    postOfAccount: {
        type: Sequelize.INTEGER
    }
})


// associations
associate = () => {
    post.belongsTo(account, {
        foreignKey: 'postOfAccount'
    }),
    post.belongsTo(thread, {
        foreignKey: 'postOnThread'
    }),
    thread.belongsTo(account, {
        foreignKey: 'threadOfAccount'
    }),
    thread.hasMany(post)
}

