/* eslint-disable */
const fs = require('fs');
const path = require('path');

const componentPath = path.join(__dirname, 'FontPenrose.tsx');
const woffBuffer = fs.readFileSync(path.join(__dirname, 'Penrose.woff'));
const woffBase64 = woffBuffer.toString('base64');

const penroseComponentStr = fs.readFileSync(componentPath, 'utf8');

const buildStr = penroseComponentStr.replace(
  /penroseWoffBase64Str[^;]*;/,
  `penroseWoffBase64Str = '${woffBase64}';`,
);

fs.writeFileSync(componentPath, buildStr, 'utf8');

console.log('penrose replace done!');
