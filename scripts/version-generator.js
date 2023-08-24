import fs from 'fs';

// Read the version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const version = packageJson.version;

// Increment the version
const [major, minor, patch] = version.split('.');
const newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;

// Update the version in package.json
packageJson.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Update the version in package-lock.json
const packageLockJson = JSON.parse(fs.readFileSync('./package-lock.json'));
packageLockJson.version = newVersion;
fs.writeFileSync(
  './package-lock.json',
  JSON.stringify(packageLockJson, null, 2)
);

// Update the version in src/index.html
const indexHtml = fs.readFileSync('./index.html', 'utf8');
const newIndexHtml = indexHtml.replace(
  /<meta name="version" content="(.*)">/,
  `<meta name="version" content="${newVersion}">`
);
fs.writeFileSync('./index.html', newIndexHtml);

console.log(`\x1b[35m%s\x1b[0m`, `Version updated to ${newVersion}`);
