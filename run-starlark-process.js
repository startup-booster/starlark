const path = require('path');
const execa = require('execa');

const run = async ({ file, handlers }) => {
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

	const child = execa('./go-starlark-bin', [file], {
		cwd: __dirname,
		stdio: ['pipe', 'inherit', 'inherit', 'ipc'],
	});

	child.on('message', async ({ message, payload }) => {
		const result = await handleMessage({ message, payload });
		child.send(result);
	});

	return await child;
};

module.exports = run;
