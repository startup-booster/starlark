const fs = require('fs/promises');
const path = require('path');

const tempDir = async (dirname = 'tmp') => {
	const tempDir = await fs.mkdtemp(path.join(__dirname, dirname));
	process.once('beforeExit', async () => {
		await fs.rm(tempDir, {
			recursive: true,
		});
	});

	return tempDir;
};

const tempFile = async (filename = 'tempfile') => {
	const dir = await tempDir();
	return path.join(dir, filename);
};

module.exports = {
	tempFile,
	tempDir,
};
