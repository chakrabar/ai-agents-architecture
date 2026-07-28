import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import { generateSvg } from '../generate-svg.js';
import { helloArchitecture } from './hello-architecture.js';

const outputPath = resolve(process.cwd(), 'output', 'hello.svg');
const svg = generateSvg(helloArchitecture);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, svg, 'utf8');
