import { Block } from "./Block"
import { Camera } from "./Camera"
import { vec3, mat4 } from "gl-matrix"

export class Scene {
  blocks: Block[]
  object_data: Float32Array
  object_count: number
  player: Camera

  chunkSize: number
  chunkCount: number

  constructor(chunkCount: number, chunkSize: number) {
    this.chunkCount = chunkCount
    this.chunkSize = chunkSize
    const buffSize = chunkSize * chunkSize * (chunkCount * chunkCount)

    this.blocks = []
    this.object_data = new Float32Array(16 * buffSize)
    this.object_count = 0
    this.player = new Camera([-20, 0, 5], 0, 0)

    for (var i: number = 0; i < this.chunkCount; i++) {
      for (var j: number = 0; j < this.chunkCount; j++) {
        this.createChunk(i, j)
      }
    }
  }

  createChunk(dX: number, dY: number) {
    var i: number = 0
    var startX: number = dX * 16
    var startY: number = dY * 16

    for (var x: number = startX; x < startX + this.chunkSize; x++) {
      for (var y: number = startY; y < startY + this.chunkSize; y++) {
        this.createEntry(x, y, i)
        i++
      }
    }
  }

  createEntry(x: number, y: number, i: number) {
    this.blocks.push(new Block([x, y - 8, 0], 0))

    var blank_matrix = mat4.create()
    for (var j: number = 0; j < 16; j++) {
      this.object_data[16 * i + j] = <number>blank_matrix.at(j)
    }
    this.object_count++
  }

  update() {
    var i: number = 0

    this.blocks.forEach((block) => {
      var model = block.get_model()
      for (var j: number = 0; j < 16; j++) {
        this.object_data[16 * i + j] = <number>model.at(j)
      }
      i++
    })
    this.player.update()
  }

  get_blocks(): Float32Array {
    return this.object_data
  }

  get_player(): Camera {
    return this.player
  }

  player_move(x: number, y: number) {
    vec3.scaleAndAdd(
      this.player.position,
      this.player.position,
      this.player.forwards,
      y
    )

    vec3.scaleAndAdd(
      this.player.position,
      this.player.position,
      this.player.right,
      x
    )
  }

  player_look(dX: number, dY: number) {
    this.player.eulers[2] -= dX
    this.player.eulers[2] %= 360

    this.player.eulers[1] = Math.min(
      89,
      Math.max(-89, this.player.eulers[1] + dY)
    )
  }
}
