const jwt = require('jsonwebtoken')
const config = require('../../../config/index')

module.exports = (request, response, next) => {
    try {
        //split the string with space and access the second segment containing the token
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.JWT_KEY);
        request.userData = decoded
        next()
    } catch (error) {
        return response.status(401).json({
            message: "Auth failed!",
            WWWAuthenticate: "OAuth2 realm=accounts"
        })
    }
}
