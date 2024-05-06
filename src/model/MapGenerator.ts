import { mat4, vec3 } from "gl-matrix"
import { Block } from "./Block"
import { Chunk } from "./Chunk"
import { SimplexNoise } from "ts-perlin-simplex"

export class MapGen {
  chunkSize: number
  center: number
  chunks: Chunk[]
  blocks: Block[]
  mapSize: number
  simplex: any
  lacunarity: number
  persistance: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.center = mapSize / 2
    this.mapSize = mapSize
    this.chunks = new Array<Chunk>(mapSize * mapSize)
    this.blocks = []
    this.simplex = new SimplexNoise()

    this.lacunarity = 2
    this.persistance = 0.5
  }

  createChunk(dX: number, dY: number): Chunk {
    if (dX >= this.mapSize - 1 || dY >= this.mapSize - 1) {
      this.mapSize += 2
    }

    let chunk = new Chunk(dX, dY, this.chunkSize)
    chunk.createChunk((x, y) => {
      var z0: number = this.octave(x, y, 0)
      var z1: number = this.octave(x, y, 1)
      var z2: number = this.octave(x, y, 2)

      var z: number = z0 + z1 + z2
      return Math.floor(z * 50)
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

  octave(x: number, y: number, order: number): number {
    let hz: number = Math.pow(this.lacunarity, order)
    let amp: number = Math.pow(this.persistance, order)
    return this.simplex.noise((x / 150) * hz, (y / 150) * hz) * amp
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
