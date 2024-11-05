import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and update package.json
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

// Create zip script
const output = createWriteStream(join(__dirname, '../project.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  console.log(`Project archived successfully! (${archive.pointer()} bytes)`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add all project files except those that should be excluded
archive.glob('**/*', {
  cwd: join(__dirname, '..'),
  ignore: [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'project.zip',
    'scripts/create-zip.js'
  ]
});

archive.finalize();