/* eslint-env jest */
const fs = require('fs-extra')

const FILES = [
  'boxes.svg',
  'circles.svg'
]

describe('cleanup-svg-icons', () => {
  it('can generate optimized SVGs from a glob', async () => {
    // Copy the input files into the output (since they get overwritten)
    FILES.forEach(file => {
      fs.copySync(`tests/input/${file}`, `tests/output/${file}`)
    })

    // Set the glob to the path of the output SVGs
    process.argv[2] = 'tests/output/*.svg'

    // Call the cleanup
    const run = require('../src/index.js')
    await run()

    // Expect that the output files match the expected files
    FILES.forEach(file => {
      const expected = fs.readFileSync(`tests/expected/${file}`, 'utf-8')
      const actual = fs.readFileSync(`tests/output/${file}`, 'utf-8')

      expect(actual).toEqual(expected)
    })
  })
})
