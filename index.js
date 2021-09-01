const fs = require('fs/promises');
const goStarlark = require('./run-starlark-process');

class Starlark {
	constructor() {
		this.runFile = this.runFile.bind(this);
		this.runSource = this.runSource.bind(this);
	}

	async runFile(filename) {
		goStarlark(filename);
	}
	async runSource(source) {
		throw new Error('Not implemented');
	}
}

const defaultStarlarkInstance = new Starlark();
defaultStarlarkInstance.Starlark = Starlark;
module.exports = defaultStarlarkInstance;
