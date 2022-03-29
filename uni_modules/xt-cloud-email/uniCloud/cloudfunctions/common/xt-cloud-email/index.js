const XtEmail = require("./config/XtEmail.js")
module.exports = function(config, defaults) {
	try {
		return new XtEmail(config, defaults)
	} catch (err) {
		console.error("new XtEmail error: ", err)
	}
}
