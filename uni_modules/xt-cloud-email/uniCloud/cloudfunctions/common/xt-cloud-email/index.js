const Mailer = require("./config/Mailer.js")
module.exports = function(config, defaults) {
	try {
		return new Mailer(config, defaults)
	} catch (err) {
		console.error("new Mailer error: ", err)
	}
}
