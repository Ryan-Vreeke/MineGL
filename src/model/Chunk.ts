import { Block } from "./Block"

export class Chunk {
  blocks: Block[]
  size: number
  offset: number
  x: number
  y: number

  constructor(x: number, y: number, size: number) {
    this.blocks = new Array(size * size)
    this.offset = size / 2
    this.size = size
    this.x = x
    this.y = y
  }

  createChunk(height: (xc: number, yc: number) => number) {
    var i: number = 0
    var bounds: number = Math.floor(this.size / 2)

    for (var x: number = -bounds; x < bounds; x++) {
      for (var y: number = -bounds; y < bounds; y++) {
        const globalX: number = this.x * this.size + x
        const globalY: number = this.y * this.size + y
        const z: number = height(globalX, globalY)

        var block = new Block([globalX, globalY, z])
        this.blocks[(x + this.offset) * this.size + (y + this.offset)] = block
        i++
      }
    }
  }
}
