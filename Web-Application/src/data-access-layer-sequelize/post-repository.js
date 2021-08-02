module.exports = function({ SQLiteDb }){
    return {
        getAllPosts: function(threadId, callback) {
            SQLiteDb.post.findAll({  
                where: { postOnThread: threadId },
                include:[{
                    model:  SQLiteDb.thread, as: 'thread',
                    required: false,
                }], 
                raw: true 
            })
            .then(posts => callback([], posts))
            .catch(error => callback(['internalError'], null))
        },
        

        createPost: function(post, callback) {
            SQLiteDb.post.create({ postTitle: post.title, 
                                   postContent: post.content, 
                                   postOnThread: post.postOnThread,
                                   postOfAccount: post.postOfAccount })
                .then(post => callback([]))
                .then(error => {
                    if (error instanceof UniqueConstraintError) {
                        callback(['Title Taken'])
                    } else {
                        callback(['internalError'])
                    }
                })
        }
    }
}