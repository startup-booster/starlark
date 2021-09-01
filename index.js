const fs = require('fs/promises');
const goStarlark = require('./run-starlark-process');

class Starlark {
	constructor() {
		this.runFile = this.runFile.bind(this);
		this.runSource = this.runSource.bind(this);
	}

	async runFile(filename) {
		const source = await fs.readFile(filename, 'utf8');
		await this.runSource(source);
	}
	async runSource(source) {
		goStarlark(source);
	}
}

const defaultStarlarkInstance = new Starlark();
defaultStarlarkInstance.Starlark = Starlark;
module.exports = defaultStarlarkInstance;
