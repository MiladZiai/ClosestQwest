const mysql = require('mysql')

const connection = mysql.createConnection({
	host     : 'database',
	user     : 'root',
	password : 'theRootPassword',
	database : 'webAppDatabase',
	multipleStatements: true
	
})

module.exports = connection
