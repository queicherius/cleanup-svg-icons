#!/usr/bin/env node
const fs = require('fs-extra')
const SVGo = require('svgo')
const execall = require('execall')
const randomstring = require('randomstring')
const glob = require('glob')

const svgo = new SVGo({
  plugins: [
    {removeTitle: true},
    {sortAttrs: true}
  ],
  js2svg: {
    pretty: true,
    indent: 2
  }
})

glob(process.argv[2], function (err, files) {
  if (err) {
    return console.error(err)
  }

  console.log('Optimizing ' + files.length + ' files')
  files.map(optimizeFile)
})

async function optimizeFile (path) {
  try {
    let file = await fs.readFile(path, 'utf-8')
    let result = await svgo.optimize(file)
    result = customOptimize(result.data)
    console.log(`${path}: ${file.length} -> ${result.length}`)
    await fs.writeFile(path, result, 'utf-8')
  } catch (err) {
    console.error('Error optimizing ' + path)
    console.error(err)
  }
}

function customOptimize (svg) {
  // Remove "data-x" attributes, because they are useless
  svg = svg.replace(/ data-[^=]*="[^"]*"/g, '')

  // Remove "id" attributes, because they are useless
  svg = svg.replace(/ id="[^"]*"/g, '')

  // Make sure that we are not using hardcoded colors and instead react to the parent
  svg = svg.replace(/#([\dA-F]{6}|[\dA-F]{3})/g, 'currentColor')

  // Force "none" fill to actually work propperly
  svg = svg.replace(/none(?!\!important)/g, 'none!important')

  // Make sure we are not using #!@?!&$! conflicting class names
  const classes = execall(/class="([^"]*)"/g, svg)
    .map(cls => cls.sub[0])
    .filter(cls => !cls.match(/^svg_\w*$/))

  classes.map(cls => {
    svg = svg.replace(new RegExp(cls, 'g'), 'svg_' + randomstring.generate(8))
  })

  return svg
}
