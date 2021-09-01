const path = require('path');
const execa = require('execa');

const starlarkSourceDir = path.join(__dirname, 'go-starlark');

const run = async sourceCode => {
	const child = execa('go', ['run', '.'], {
		cwd: starlarkSourceDir,
		input: sourceCode,
		stdio: ['pipe', 'inherit', 'inherit', 'ipc'],
	});

	child.on('message', message => {
		console.log(`Node.js handling message ${JSON.stringify(message)}`);
		child.send({ response: 'ok' });
	});

	return await child;
};

module.exports = run;
