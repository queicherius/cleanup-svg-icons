# cleanup-svg-icons

> Clean up SVGs to be actually usable as icons

- Optimize the SVG (merge paths, etc.)
- Remove elements that are useless (e.g. `<title>`)
- Remove attributes that are useless (e.g. `id`, `data-*`)
- Make sure that class names are not colliding (e.g. AI always exports with `cls-1`, `cls-2`, etc.)
- Replace hardcoded colors with `currentColor` so we can use the parent for styling
- Make sure that `fill: none` is working when `fill: currentColor` is on the parent

## Usage

> :warning: This modifies files directly, please use version control or make a backup.

```
git clone https://github.com/queicherius/make-svg-less-stupid
npm install
node index.js "/the/path/to/a/folder/or/any/glob/*.svg"
```
