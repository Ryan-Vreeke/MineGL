import { Block } from "./Block"

export class Chunk {
  blocks: Block[]
  size: number
  x: number
  y: number
  object_data: Float32Array

  constructor(x: number, y: number, size: number) {
    this.blocks = new Array(size * size)
    this.object_data = new Float32Array(16 * size * size)
    this.size = size
    this.x = x
    this.y = y
  }

  createChunk(height: (xc: number, yc: number) => number) {
    var i: number = 0

    for (var x: number = 0; x < this.size; x++) {
      for (var y: number = 0; y < this.size; y++) {
        const globalX: number = this.x * this.size + x
        const globalY: number = this.y * this.size + y
        const z: number = height(globalX, globalY)

        var block = new Block([globalX, globalY, z], 0)
        this.createEntry(x, y, i, block)
        i++
      }
    }
  }

  createEntry(x: number, y: number, i: number, block: Block) {
    this.blocks[x * this.size + y] = block

    var model = this.blocks[x * this.size + y].get_model()
    for (var j: number = 0; j < 16; j++) {
      this.object_data[16 * i + j] = <number>model.at(j)
    }
  }
}
