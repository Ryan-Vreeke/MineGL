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
    if (dX >= this.mapSize || dY >= this.mapSize) {
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
}
