const starlark = require('.');

const file = require.resolve('./test/main.star');

const { performance } = require('perf_hooks');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

starlark.registerHandler('k8s_resource', async () => {
	return { ok: true };
});

(async () => {
	const startTime = performance.now();
	for (let i = 0; i < 1000; i++) {
		await starlark.runFile(file);
	}
	const endTime = performance.now();

	console.log((endTime - startTime) / 1000);
})();
