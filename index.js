import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fetch from 'node-fetch';

const currentDir = dirname(fileURLToPath(import.meta.url));

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();
console.log(body);

fs.mkdir(path.join(currentDir, 'memes'), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});
