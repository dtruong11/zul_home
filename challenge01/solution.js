// RETRIEVE INPUT FROM TEXT FILE
const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input.txt') // get the path to input.txt
const content = fs.readFileSync(origin, 'utf-8')
const input = JSON.parse(content) // parse input as json format