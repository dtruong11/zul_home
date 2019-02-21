const { expect } = require('chai');
const { addNewNode } = require('../challenge01/solution')

// same input as in input.txt 
let testInput = {
  "nodes": [0, 1, 2],
  "edges": [[0, 1], [0, 2]],
  "newNode": 3
}
let output = addNewNode(testInput)

describe('addNewNode()', () => {
  describe('Check for the right format', () => {
    it('Should be a function', function () {
      expect(addNewNode).to.be.a('function')
    })
    it('the output should be in the right format { nodes, edges }', () => {
      expect(output).to.include.all.keys('nodes', 'edges')
      expect(output.nodes).to.be.an('array')
      expect(output.edges).to.be.an('array')
    })
    it('Throw error if there is no new node to add. Invalid input.', () => {
      let noNewNode = {
        "nodes": [0, 1, 2],
        "edges": [[0, 1], [0, 2]]
      }
      expect(() => addNewNode(noNewNode)).to.throw()
    })
    it('Throw error if there is no vertex in input, but edges are present. Invalid input.', () => {
      let noVertex = {
        "nodes": [],
        "edges": [[0, 1], [0, 2]],
        "newNode": 3
      }
      expect(() => addNewNode(noVertex)).to.throw()
    })
  })
  describe('Check for the right result', () => {
    it('the new node must be added to the graph', () => {
      // the node must be added to the list of vertices and included in the edges array
      expect(output.nodes).to.include(testInput.newNode)
      expect(output.edges).to.have.nested.property(`${testInput.newNode}`)
    })
    it('if the graph is empty, just add the node to the graph', () => {
      // empty graph 
      let emptyGraph = {
        "nodes": [],
        "edges": [],
        "newNode": 3
      }
      expect(addNewNode(emptyGraph)).to.eql({
        'nodes': [3],
        'edges': []
      })
    })
    it('the new node must be the child of all nodes in the graph that had no children before it was added', () => {
      // normal case: multiple edges, multiple nodes 
      expect(output.nodes).to.include(testInput.newNode)
      expect(output.edges).to.deep.include.members([[0, 1], [0, 2], [1, 3], [2, 3]])
  
      // graph without edges 
      let noEdges = {
        'nodes': [4, 5, 6],
        'edges': [],
        'newNode': 3
      }
      let noEdgesOutput = addNewNode(noEdges)
      expect(noEdgesOutput.nodes).to.include(noEdges.newNode)
      expect(noEdgesOutput.edges).to.deep.include.members([[4, 3], [5, 3], [6, 3]])
    })
  })
})
