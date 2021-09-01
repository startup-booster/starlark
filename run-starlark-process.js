const path = require('path');
const execa = require('execa');

const starlarkSourceDir = path.join(__dirname, 'go-starlark');

const handlers = {
	k8s_resource: () => ({ response: 'ok' }),
};

const handleMessage = async ({ message, payload }) => {
	try {
		const handler = handlers[message];
		if (!handler) {
			return { error: `Unknown message: ${message}` };
		}
		return { response: await handler(payload) };
	} catch (e) {
		return { error: e.message };
	}
};

const run = async sourceFile => {
	const child = execa('go', ['run', '.', sourceFile], {
		cwd: starlarkSourceDir,
		stdio: ['pipe', 'inherit', 'inherit', 'ipc'],
	});

	child.on('message', async ({ message, payload }) => {
		const result = await handleMessage({ message, payload });
		console.log(result);
		child.send(result);
	});

	return await child;
};

module.exports = run;
