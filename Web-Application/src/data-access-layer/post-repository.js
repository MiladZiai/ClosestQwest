module.exports = function( { MySQLDb }) {

    exports.getAllPosts = function(threadId, callback) {
        const query = ` SELECT p.postId, p.postTitle, p.postContent, p.postOnThread, p.postOfAccount, t.threadName 
                        FROM post as p 
                        LEFT JOIN thread as t 
                        ON p.postOnThread = t.threadId 
                        WHERE postOnThread = ?
                        ORDER by postId DESC`

        MySQLDb.query(query, threadId, function(error, posts) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], posts)
            }
        })
    }

    exports.createPost = function(post, callback) {
        const query = `INSERT INTO post (postTitle, postContent, postOnThread, postOfAccount) VALUES (?, ?, ?, ?)`
        const values = [post.title, post.content, post.postOnThread, post.postOfAccount]

        MySQLDb.query(query, values, function(error) {
            if (error) {
                if (error.sqlMessage.includes("titleUnique")) {
                    callback(['Title Taken'])
                } else {
                    callback(['internalError'])
                }
            } else {
                callback([])
            }
        })

    }

    return exports

}