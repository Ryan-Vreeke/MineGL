import { Camera } from "./Camera"
import { vec3 } from "gl-matrix"
import { MapGen } from "./MapGenerator"

export class Scene {
  object_data: Float32Array
  texture_data: Float32Array
  object_count: number
  player: Camera

  chunkSize: number
  chunkCount: number
  mapGen: MapGen
  i: number

  constructor(chunkCount: number, chunkSize: number) {
    this.chunkCount = chunkCount
    this.chunkSize = chunkSize
    this.i = 0

    this.player = new Camera([-20, 0, 10], 0, 0)
    this.mapGen = new MapGen(chunkSize, chunkCount)
    const range = Math.floor(chunkCount / 2)

    // for (var i: number = -range; i <= range - 1; i++) {
    //   for (var j: number = -range; j <= range - 1; j++) {
    //     this.mapGen.createChunk(i, j)
    //   }
    // }
    this.mapGen.createChunk(0,0)

    let data = this.mapGen.getObjectData()

    this.object_data = data[0]
    this.texture_data = data[1]
    this.object_count = this.object_data.length / 16
  }

  update() {
    this.player.update()
  }

  get_textures(): Float32Array {
    return this.texture_data
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

    this.mapGen.createChunk(
      Math.floor(this.player.position[0] / this.chunkSize),
      Math.floor(this.player.position[1] / this.chunkSize)
    )

    let data = this.mapGen.getObjectData()

    this.object_data = data[0]
    this.texture_data = data[1]
    this.object_count = this.object_data.length / 16
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
