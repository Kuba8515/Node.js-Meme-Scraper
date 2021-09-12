import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// Create "memes" folder if it doesn't exist.
const currentDir = dirname(fileURLToPath(import.meta.url));
fs.mkdir(path.join(currentDir, 'memes'), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
});

// Fetch data with Node-fetch and scrape using Cheerio.
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();
const imageUrls = [];

// Loop through Array.
const $ = cheerio.load(body);
const myFolder = './memes';
for (let i = 0; i < 10; i++) {
  const image = $('img', body)[i].attribs.src;
  const myUrls = imageUrls.push(image);
  fetch(image).then((res) => {
    const dest = fs.createWriteStream(`${myFolder}/memes${i + 1}.jpg`);
    res.body.pipe(dest);
  });
}
