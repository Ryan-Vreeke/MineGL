import { Block } from "./Block"

export class Chunk {
  blocks: number[]
  size: number
  offset: number
  x: number
  y: number

  constructor(x: number, y: number, size: number) {
    this.blocks = new Array((size + 2) * (size + 2))
    this.blocks.fill(-100 as number)

    this.offset = size / 2
    this.size = size
    this.x = x
    this.y = y
  }

  createChunk(height: (xc: number, yc: number) => number) {
    for (var i = 1; i <= this.size; i++) {
      for (var j = 1; j <= this.size; j++) {
        const globalX: number = this.x * this.size + i - 1
        const globalY: number = this.y * this.size + j - 1
        this.add(i, j, height(globalX, globalY))
      }
    }
  }

  at(x: number, y: number): number {
    return this.blocks[x * (this.size + 2) + y]
  }

  add(x: number, y: number, value: number) {
    this.blocks[x * (this.size + 2) + y] = value
  }

  getNeighbors(x: number, y: number): number[] {
    var neighbors: number[] = []

    neighbors.push(this.at(x - 1, y)) //L
    neighbors.push(this.at(x + 1, y)) //R
    neighbors.push(this.at(x, y - 1)) //T
    neighbors.push(this.at(x, y + 1)) //B

    return neighbors
  }
  getBlocks(): Block[] {
    var geoBlocks: Block[] = []

    for (var i = 1; i <= this.size; i++) {
      for (var j = 1; j <= this.size; j++) {
        const globalX: number = this.x * this.size + i - 1
        const globalY: number = this.y * this.size + j - 1
        const z: number = this.at(i, j)
        const neighbors = this.getNeighbors(i, j)

        let block: Block = new Block([globalX, globalY, z], neighbors)
        geoBlocks.push(block)
      }
    }

    return geoBlocks
  }
}
