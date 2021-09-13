import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

// Create "memes" folder if it doesn't exist yet.
const currentDir = dirname(fileURLToPath(import.meta.url));
fs.mkdir(path.join(currentDir, 'memes'), (err) => {
  if (err) {
    return console.error('Directory already exists!');
  }
  console.log('Directory created successfully!');
});

// Fetch data with Node-fetch.
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();
const imageUrls = [];

// Scrape using Cheerio and loop through Array --> 'memes'.
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

console.log('10 images succesfully saved in /memes folder!');
