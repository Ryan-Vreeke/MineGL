import { Block } from "./Block"
import { Camera } from "./Camera"
import { vec3, mat4 } from "gl-matrix"
import { MapGen } from "./MapGenerator"

export class Scene {
  object_data: Float32Array
  object_count: number
  player: Camera

  chunkSize: number
  chunkCount: number
  mapGen: MapGen

  constructor(chunkCount: number, chunkSize: number) {
    this.chunkCount = chunkCount
    this.chunkSize = chunkSize
    const buffSize = chunkSize * chunkSize * (chunkCount * chunkCount)

    // this.object_data = new Float32Array(16 * buffSize)
    this.player = new Camera([-20, 0, 5], 0, 0)
    this.mapGen = new MapGen(chunkSize)

    // this.mapGen.createChunk(0, 0)
    this.mapGen.createChunk(1, 0)

    this.object_data = this.mapGen.update()
    this.object_count = chunkSize * chunkSize
  }

  update() {
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
