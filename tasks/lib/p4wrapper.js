module.exports = function() {

	var exec = require('child_process').exec;

	function getOpt(p4options, name, prefix) {
		if(typeof p4options[name] === "undefined") {
			return "";
		}

		return " " + prefix + p4options[name];
	}

	function getCommandline(p4options) {
		var opt = p4options || {};
		return "p4" + getOpt(opt, "port", "-p ") 
					+ " " + p4options.cmd;
	}

	return {
		run: function(p4options, cb) {
			exec(getCommandline(p4options), cb);
		}
	};

};