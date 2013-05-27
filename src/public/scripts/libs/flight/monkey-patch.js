var fs = require('fs');
var files = fs.readdirSync(__dirname);

files.forEach(function (file) {
	var filePath = __dirname + '\\' + file;
	var content = fs.readFileSync(filePath).toString();

	// './debug'
	content = content.replace(/\.\.\/tools\/debug\/debug/g, '\./debug');

    // './registry',
    content = content.replace(/\.\.\/\.\.\/lib\/registry/g, '\./registry');

    // './utils'
    content = content.replace(/\.\.\/\.\.\/lib\/utils/g, '\./utils');

	fs.writeFileSync(filePath, content);
})
