# cleanup-svg-icons

[![Build Status](https://img.shields.io/travis/queicherius/cleanup-svg-icons.svg?style=flat-square)](https://travis-ci.org/queicherius/cleanup-svg-icons)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/cleanup-svg-icons/master.svg?style=flat-square)](https://codecov.io/github/queicherius/cleanup-svg-icons) [![Greenkeeper badge](https://badges.greenkeeper.io/queicherius/cleanup-svg-icons.svg)](https://greenkeeper.io/)

> Clean up SVGs to be actually usable as icons

## Install

```
npm install -g cleanup-svg-icons
```

## Usage

> :warning: This modifies files in-place, please use version control or make a backup.

```
cleanup-svg-icons "/the/path/to/a/folder/or/any/glob/*.svg"
```

## Internals

- Optimize the SVG (merge paths, etc.)
- Remove elements that are useless (e.g. `<title>`)
- Remove attributes that are useless (e.g. `id`, `data-*`)
- Make sure that class names are not colliding (e.g. AI always exports with `cls-1`, `cls-2`, etc.)
- Replace hardcoded colors with `currentColor` so the parent can be used for styling
- Make sure that `fill: none` is working when `fill: currentColor` is on the parent
