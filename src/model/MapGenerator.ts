import { mat4, vec3 } from "gl-matrix"
import { Block } from "./Block"
import { Chunk } from "./Chunk"

export class MapGen {
  chunkSize: number
  center: number
  chunks: Chunk[]
  mapSize: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.center = mapSize / 2
    this.mapSize = mapSize
    this.chunks = Array<Chunk>(mapSize * mapSize)
  }

  createChunk(dX: number, dY: number) {
    let chunk = new Chunk(dX, dY, this.chunkSize)
    chunk.createChunk((x, y) => {
      return 0
    })

    const i: number = dX + this.center
    const j: number = dY + this.center
    this.chunks[i * this.mapSize + j] = chunk
  }

  getChunk(wX: number, wY: number): Chunk{
    const i: number = wX + this.center
    const j: number = wY + this.center
    return this.chunks[i * this.mapSize + j]
  }

  getBlocks(): Block[] {
    let bl: Block[]
    bl = []

    for (let i: number = 0; i < 16; i++) {
      for (let j: number = 0; j < 16; j++) {
        // bl.push(this.chunks[0][0].blocks[i][j][0])
      }
    }

    return bl
  }
}
