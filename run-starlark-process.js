const path = require('path');
const execa = require('execa');

const starlarkSourceDir = path.join(__dirname, 'go-starlark');

const run = async sourceCode => {
	const child = execa('go', ['run', '.'], {
		cwd: starlarkSourceDir,
		input: sourceCode,
		stdio: ['pipe', 'inherit', 'inherit'],
	});

	return await child;
};

module.exports = run;
