import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filePath) => fs.readFileSync(resolve(filePath));
const getFixture = (filename) => readFile(getFixturePath(filename)).toString().trim();

export { getFixturePath, getFixture };
