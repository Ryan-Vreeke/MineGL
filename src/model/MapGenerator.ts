import { mat4, vec3, vec2 } from "gl-matrix"
import { Block, Face } from "./Block"
import { Deg2Rad } from "./math_stuff"
import { Chunk } from "./Chunk"
import { SimplexNoise } from "ts-perlin-simplex"

const INTENSITY: number = 30
const OFFSET: number = 60
const NOISE_OFFSET: vec2 = [0, 0]
const NOISE_SCALE: vec2 = [10, 10]

export class MapGen {
  chunkSize: number
  center: number
  chunks: Chunk[][]

  mapSize: number
  simplex: any
  lacunarity: number
  persistance: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.center = Math.floor(mapSize / 2)
    this.mapSize = mapSize
    this.chunks = new Array(mapSize)
    for (var i = 0; i < mapSize; i++) {
      this.chunks[i] = new Array(mapSize)
    }

    this.simplex = new SimplexNoise()

    this.lacunarity = 2
    this.persistance = 0.7
  }

  octave(x: number, y: number, order: number): number {
    let hz: number = Math.pow(this.lacunarity, order)
    let amp: number = Math.pow(this.persistance, order)
    return this.simplex.noise(x * hz, y * hz) * amp
  }

  createChunk(dX: number, dY: number): Chunk {
    if (dX >= this.mapSize - 1 || dY >= this.mapSize - 1) {
      this.mapSize += 2
    }

    let chunk = new Chunk(dX, dY, this.chunkSize)
    chunk.createChunk((x, y) => {
      const perlinX = NOISE_OFFSET[0] + x / (this.chunkSize * NOISE_SCALE[0])
      const perlinY = NOISE_OFFSET[1] + y / (this.chunkSize * NOISE_SCALE[1])

      var z0: number = this.octave(perlinX, perlinY, 0)
      var z1: number = this.octave(perlinX, perlinY, 1)
      var z2: number = this.octave(perlinX, perlinY, 2)

      var z: number = z0 + z1 + z2
      return Math.max(0, Math.floor(z * INTENSITY + OFFSET))
    })
    this.chunks[dX + this.center][dY + this.center] = chunk

    return chunk
  }

  getChunk(wX: number, wY: number): Chunk {
    const i: number = wX + this.center
    const j: number = wY + this.center
    return this.chunks[i][j]
  }

  isChunk(x: number, y: number): boolean {
    const chunk = this.chunks[x][y]
    if (chunk == null) {
      return false
    }
    return true
  }

  chunkFaces(i: number, j: number, x: number, y: number, z: number): Face[] {
    let faces: Face[] = []
    const chunk = this.chunks[i][j]
    const wX = chunk.x * this.chunkSize + x
    const wY = chunk.y * this.chunkSize + y

    if (i > 0 && x == 0 && this.isChunk(i - 1, j)) {
      let c2 = this.chunks[i - 1][j]

      if (!c2.getBlock(wX - 1, wY, z)) {
        faces.push(
          new Face([wX - 0.5, wY, z], [Deg2Rad(90), Deg2Rad(-90), 0], "stone")
        )
      }
    } else if ( i < this.mapSize - 1 && x == this.chunkSize - 1 && this.isChunk(i + 1, j)) {
      let c2 = this.chunks[i + 1][j]

      if (!c2.getBlock(wX + 1, wY, z)) {
        faces.push(
          new Face([wX + 0.5, wY, z], [Deg2Rad(90), Deg2Rad(90), 0], "stone")
        )
      }
    }

    if (j > 0 && y == 0 && this.isChunk(i, j - 1)) {
      let c2 = this.chunks[i][j - 1]

      if (!c2.getBlock(wX, wY - 1, z)) {
        faces.push(
          new Face([wX, wY - 0.5, z], [Deg2Rad(90), Deg2Rad(0), 0], "stone")
        )
      }
    } else if ( j < this.mapSize - 1 && y == this.chunkSize - 1 && this.isChunk(i, j + 1)) {
      let c2 = this.chunks[i][j + 1]

      if (!c2.getBlock(wX, wY + 1, z)) {
        faces.push(
          new Face(
            [wX, wY + 0.5, z],
            [Deg2Rad(-90), Deg2Rad(0), Deg2Rad(180)],
            "stone"
          )
        )
      }
    }
    return faces
  }

  getObjectData(): [Float32Array, Float32Array] {
    let faces: Face[] = []

    for (var i = 0; i < this.chunks.length; i++) {
      for (var j = 0; j < this.chunks.length; j++) {
        const chunk = this.chunks[i][j]
        if (chunk == null) {
          continue
        }

        for (var x = 0; x < chunk.blocks.length; x++) {
          for (var y = 0; y < chunk.blocks.length; y++) {
            for (var z = 0; z < chunk.blocks[x][y].length; z++) {
              faces.push(...this.chunkFaces(i, j, x, y, z))
              faces.push(...chunk.neighbors(x, y, z))
            }
          }
        }
      }
    }

    const object_data: Float32Array = new Float32Array(16 * faces.length)
    const texture_data: Float32Array = new Float32Array(2 * faces.length)
    var i: number = 0

    faces.forEach((face) => {
      var model = face.get_model()
      for (var j: number = 0; j < 16; j++) {
        object_data[16 * i + j] = <number>model.at(j)
      }

      switch (face.type) {
        case "grass-side":
          texture_data[2 * i] = 3 / 16
          texture_data[2 * i + 1] = 0
          break
        case "grass-top":
          texture_data[2 * i] = 0
          texture_data[2 * i + 1] = 0
          break
        case "dirt":
          texture_data[2 * i] = 2 / 16
          texture_data[2 * i + 1] = 0
          break
        case "stone":
          texture_data[2 * i] = 1 / 16
          texture_data[2 * i + 1] = 0
          break
      }

      i++
    })

    return [object_data, texture_data]
  }
}
