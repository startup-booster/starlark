const fs = require('fs/promises');
const goStarlark = require('./run-starlark-process');
const { tempFile } = require('./tempfile');

class Starlark {
	constructor() {
		this.runFile = this.runFile.bind(this);
		this.registerHandler = this.registerHandler.bind(this);
		this.handlers = [];
	}

	async runFile(file) {
		await goStarlark({ file, handlers: this.handlers });
	}

	async registerHandler(name, handler) {
		this.handlers[name] = handler;
	}
}

const defaultStarlarkInstance = new Starlark();
defaultStarlarkInstance.Starlark = Starlark;
module.exports = defaultStarlarkInstance;
