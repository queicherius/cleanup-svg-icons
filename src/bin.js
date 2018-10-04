#!/usr/bin/env node
const run = require('./index.js')

run()
  .catch(err => {
    console.log('Optimization failed', err)
    process.exit(1)
  })
