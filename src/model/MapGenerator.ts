import { mat4, vec3 } from "gl-matrix"
import { Block, Face } from "./Block"
import { Chunk } from "./Chunk"
import { SimplexNoise } from "ts-perlin-simplex"

export class MapGen {
  chunkSize: number
  center: number
  chunks: Chunk[]

  mapSize: number
  simplex: any
  lacunarity: number
  persistance: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.center = mapSize / 2
    this.mapSize = mapSize
    this.chunks = []

    this.simplex = new SimplexNoise()

    this.lacunarity = 2
    this.persistance = 0.5
  }

  octave(x: number, y: number, order: number): number {
    let hz: number = Math.pow(this.lacunarity, order)
    let amp: number = Math.pow(this.persistance, order)
    return this.simplex.noise((x / 150) * hz, (y / 150) * hz) * amp
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
      return Math.max(0, Math.floor(z * 25) + 25)
    })
    this.chunks.push(chunk)

    return chunk
  }

  getChunk(wX: number, wY: number): Chunk {
    const i: number = wX + this.center
    const j: number = wY + this.center
    return this.chunks[i * this.mapSize + j]
  }

  getObjectData(): Float32Array {
    let faces: Face[] = []

    this.chunks.forEach((chunk) => {
      for (var x = 0; x < chunk.blocks.length; x++) {
        for (var y = 0; y < chunk.blocks.length; y++) {
          for (var z = -1; z < chunk.blocks[x][y].length; z++) {
            faces.push(...chunk.neighbors(x, y, z))
          }
        }
      }
    })

    const object_data: Float32Array = new Float32Array(16 * faces.length)
    var i: number = 0

    faces.forEach((face) => {
      var model = face.get_model()
      for (var j: number = 0; j < 16; j++) {
        object_data[16 * i + j] = <number>model.at(j)
      }
      i++
    })

    return object_data
  }
}
