const path = require('path');
const execa = require('execa');

const starlarkSourceDir = path.join(__dirname, 'go-starlark');

const run = async sourceFile => {
	const child = execa('go', ['run', '.', sourceFile], {
		cwd: starlarkSourceDir,
		stdio: ['pipe', 'inherit', 'inherit', 'ipc'],
	});

	child.on('message', message => {
		console.log(`Node.js handling message ${JSON.stringify(message)}`);
		child.send({ response: 'ok' });
	});

	return await child;
};

module.exports = run;
