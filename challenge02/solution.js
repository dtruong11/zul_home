
/* 
LOGIC: 
SECTION 1: Build the graph showing connections between tent (T), water (W), food (F)
The function is working with an m x n matrix from the input file. m as number of rows; n as number of columns 
Step 1: Find all the tents' locations. Create an array of tents. 
Convert T, W, F's location as num = i * n + j; 
                              i as current row
                              j as current col 
                              n as number of columns in matrix 
Convert from num back to i, j => j = num % n; i = (num - j)/n 
let tentsArr = [{T1 : 11}, {T2: 18}, {T3: 21}]

Step 2: From each tent, do a bfs search in each direction in D (distance) steps.
If encounter a F or W, convert its location to a num val 
Add that connection as an edge in the graph 

let edges = {
  T1: [{ W1 : 12 }, { F2 : 16 } ],
  T2: [{ W1 : 12 }, { W2 : 23 }, { F2: 16 }],
  T3: [{ W1 : 12 }, { F1 : 19}]
}

Step 3: Construct the graph 
let graph = {
  nodes: tentsArr 
  edges: edges
}

SECTION 2: Count the flow in the graph that has T, W, F 
 
*/
const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input2.txt')
const content = fs.readFileSync(origin, 'utf-8').trim().split('\n')
// const { Queue } = require('./util')

function numOfCampers(content) {
  let info = content.shift().split(',').map(el => parseInt(el))
  let matrix = content.map(el => el.split('')) 
  let rows = info[0]
  let cols = info[1]
  let distance = info[2]
  let visited = []
  
  // Create an array of tents 
  let tents = []
  let count = 1
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 'X') {
        visited[i] = []
        visited[i][j] = true
      }
      else {
        visited[i] = []
        visited[i][j] = false
      }
      if (matrix[i][j] === 'T') {
        let tentLocation = i * cols + j
        let tentInfo = {}
        tentInfo[`T${count}`] = tentLocation
        tents.push(tentInfo)
      }
    }
  }
  console.log('Array of tents', tents)
}

numOfCampers(content)

module.exports = {
  numOfCampers
}