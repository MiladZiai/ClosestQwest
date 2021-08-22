const Sequelize = require('sequelize'); 
const sequelize = new Sequelize('sqlite::memory:', 'defaultUsername', 'defaultPassword', { 
    dialect: 'sqlite', 
    host: 'localhost', 
    logging: false,
});

const db = {};

const main = async () => { 
    //Test the DB Connection 
    await sequelize.authenticate();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // account model
    db.account = sequelize.define(
        'account',
        {
            accountId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
        },
        { timestamps: false, tableName: 'account', freezeTableName: true },
    );

    // thread model
    db.thread = sequelize.define(
        'thread',
        {
            threadId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            threadName: {
                type: Sequelize.STRING,
            },
            threadOfAccount: {
                type: Sequelize.INTEGER,
            },
        },
        { timestamps: false, tableName: 'thread', freezeTableName: true },
    );

    // post model
    db.post = sequelize.define(
        'post',
        {
            postId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            postTitle: {
                type: Sequelize.STRING,
            },
            postContent: {
                type: Sequelize.TEXT,
                unique: true,
            },
            postOnThread: {
                type: Sequelize.INTEGER,
            },
            postOfAccount: {
                type: Sequelize.INTEGER,
            },
        },
        { timestamps: false, tableName: 'post', freezeTableName: true },
    );

    //associations
    db.account.associate = (models) => {
        db.account.hasMany(models.post, {
            foreignKey: 'postOfAccount',
            as: 'posts',
        });
    };
    db.account.associate(db);

    db.post.associate = (models) => {
        db.post.belongsTo(models.account, {
            foreignKey: 'postOfAccount',
            as: 'account',
        });
        db.post.belongsTo(models.thread, {
            foreignKey: 'postOnThread',
            as: 'thread',
        });
    };
    db.post.associate(db);

    db.thread.associate = (models) => {
        db.thread.belongsTo(models.account, {
            foreignKey: 'threadOfAccount',
            as: 'account',
        });
        db.thread.hasMany(models.post, {
            foreignKey: 'postOnThread',
            as: 'posts',
        });
    };
    db.thread.associate(db);

    sequelize.sync()
    
}; 

main(); 
module.exports = db;