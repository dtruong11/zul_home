/* 
Write a program that adds a single new node to a directed graph. The new node must be the child of all nodes in the graph that had no children before it was added.
*/


// RETRIEVE INPUT FROM TEXT FILE
const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input.txt') // get the path to input.txt
const content = fs.readFileSync(origin, 'utf-8')
const input = JSON.parse(content) // parse input as json format

/* LOGIC
  Handle special cases: empty graph, graph with only one node 
  Step 1: Create objects to stores nodes with children, nodesWithChild, 
  and nodes without children, noChild => O(1) access
  Step 2: Fill up nodesWithChild and noChild objects
  Step 3: Each key in noChild object will then point to the new node. 
  Add edges connection between that key and the new node. 
  Step 4: Add the new node to list of vertices
  Step 5: Return the graph in format of {
    nodes,
    edges
  }
*/

// IMPLEMENTATION 
// Function addNewNode accepts input object and destructures it in the parameter. 
const addNewNode = ({ newNode, nodes, edges }) => {
  let vertices = nodes

  /* Error handling */
  // No new node to add  
  if (!newNode) throw new Error('There is no new node to add')
  // The graph has edges, but no node listed in 'nodes' array 
  if (vertices.length === 0 && edges.length > 0) throw new Error('The input should have an array of nodes, if edges are present')

  // Special cases:
  /* Case 1: the graph has no node, no edges */
  if (vertices.length === 0) {
    return {
      "nodes": [newNode],
      "edges": edges
    }
  }

  /* Case 2: the graph has more than one node, but no edges */
  if (vertices.length >= 1 && edges.length === 0) {
    let edgesArr = vertices.map(el => {
      return [el, newNode]
    })
    return {
      'nodes': [...vertices, newNode],
      'edges': edgesArr
    }
  }

  /* Case 3: the graph has multiple nodes, multiple edges */
  // Step 1: Objects of nodes with children and without child
  let nodesWithChild = {}
  let noChild = {}

  // Step 2: Loop through the edges array. The first element is the parent, while the second element is it schild. Put the parent element in nodesWithChild object 
  edges.map(el => nodesWithChild[el[0]] = true)

  // Loop through the array of vertices. Any vertex not present in nodesWithChild is put into noChild object 
  vertices.map(el => {
    if (!nodesWithChild.hasOwnProperty(el)) noChild[el] = true
  })

  // Step 3: Loop through the noChild object and each of the node is then directed to the newNode. 
  // Add this connection to the edges array. The key in noChild object is set as the parent node and the newNode is its child 
  for (let node in noChild) {
    edges.push([parseInt(node), newNode])
  }

  // Step 4: Add this newNode to the array of vertices 
  vertices.push(newNode)

  // Step 5: Return the graph in designed format 
  return {
    "nodes": vertices,
    "edges": edges
  }
}

console.log('Solution: ', addNewNode(input))


module.exports = {
  addNewNode
}