exports.getErrorsNewPost = function(post) {

    const errors = []
    const minTitleLen = 5
    const minContentLen = 10
    const maxTitleLen = 50
    const maxContentLen = 500

    // Validate title.
    if (!(/\w+/).test(post.title)) {
        errors.push("Title Missing")
        return errors
    } else if (post.title && post.title.length < minTitleLen) {
        errors.push("Title Too Short")
    } else if (post.title && post.title.length > maxTitleLen) {
        errors.push("Title Too Long")
    }

    // Validate content.
    if (!(/\w+/).test(post.content)) {
        errors.push("Content Missing")
        return errors
    } else if (post.content && post.content.length < minContentLen) {
        errors.push("Content Too Short")
    } else if (post.content && post.content.length > maxContentLen) {
        errors.push("Content Too Long")
    }
    
    return errors
}