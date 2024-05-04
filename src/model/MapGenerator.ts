import { mat4, vec3 } from "gl-matrix"
import { Block } from "./Block"
import { Chunk } from "./Chunk"

export class MapGen {
  chunkSize: number
  center: number
  chunks: Chunk[]
  blocks: Block[]
  mapSize: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.center = mapSize / 2
    this.mapSize = mapSize
    this.chunks = new Array<Chunk>(mapSize * mapSize)
    this.blocks = []
  }

  createChunk(dX: number, dY: number): Chunk {
    if (dX >= this.mapSize - 1 || dY >= this.mapSize - 1) {
      this.mapSize += 2
    }

    let chunk = new Chunk(dX, dY, this.chunkSize)
    chunk.createChunk((x, y) => {
      return 0
    })

    const i: number = dX + this.center
    const j: number = dY + this.center

    this.chunks[i * this.mapSize + j] = chunk
    this.blocks.push(...chunk.blocks)
    return chunk
  }

  getChunk(wX: number, wY: number): Chunk {
    const i: number = wX + this.center
    const j: number = wY + this.center
    return this.chunks[i * this.mapSize + j]
  }

  getBlocks(): Block[] {
    return this.blocks
  }

  getObjectData(): Float32Array {
    const object_data: Float32Array = new Float32Array(
      16 * this.mapSize * this.mapSize * this.chunkSize * this.chunkSize
    )
    var i: number = 0

    this.blocks.forEach((block) => {
      var model = block.get_model()
      for (var j: number = 0; j < 16; j++) {
        object_data[16 * i + j] = <number>model.at(j)
      }
      i++
    })

    return object_data
  }
}
