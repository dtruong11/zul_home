const { expect } = require('chai');
const { addNewNode } = require('../challenge01/solution')


let testInput = {
  "nodes": [0, 1, 2],
  "edges": [[0, 1], [0, 2]],
  "newNode": 3
}
let output = addNewNode(testInput)


describe('addNewNode()', () => {
  it('should be a function', function () {
    expect(addNewNode).to.be.a('function')
  })
  it('should throw error if there is no new node in input', () => {
    let noNewNode = {
      "nodes": [0, 1, 2],
      "edges": [[0, 1], [0, 2]]
    }
    expect(() => addNewNode(noNewNode)).to.throw()
  })
  it('should throw error if there is no vertex in input', () => {
    let noVertex = {
      "nodes": [],
      "edges": [[0, 1], [0, 2]],
      "newNode": 3
    }
    expect(() => addNewNode(noVertex)).to.throw()
  })
  it('should throw error if there are no edges between nodes in input', () => {
    let noEdges = {
      "nodes": [],
      "edges": [],
      "newNode": 3
    }
    expect(() => addNewNode(noEdges)).to.throw()
  })
  it('the output should be in the right format { nodes, edges }', () => {
    expect(output).to.include.all.keys('nodes', 'edges')
    expect(output.nodes).to.be.an('array')
    expect(output.edges).to.be.an('array')
  })
  it('the new node must be added to the graph', () => {
    expect(output.nodes).to.include(testInput.newNode)
    expect(output.edges).to.deep.include(testInput.newNode)
  })

})