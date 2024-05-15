import { Camera } from "./Camera"
import { vec3 } from "gl-matrix"
import { MapGen } from "./MapGenerator"

export class Scene {
  object_data: Float32Array
  texture_data: Float32Array
  object_count: number
  player: Camera
  lastX: number

  chunkSize: number
  chunkCount: number
  mapGen: MapGen
  i: number

  constructor(chunkCount: number, chunkSize: number) {
    this.chunkCount = chunkCount
    this.chunkSize = chunkSize
    this.i = 0

    this.player = new Camera([0, 0, 0], 0, 0)
    this.lastX = 0
    this.mapGen = new MapGen(chunkSize, chunkCount)
    const range = Math.floor(chunkCount / 2)

    for (var i: number = -range; i <= range; i++) {
      for (var j: number = -range; j <= range; j++) {
        this.mapGen.createChunk(i, j)
      }
    }

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

    // const testX =  Math.floor(this.player.position[0] / 16)
    // console.log(testX);
    //

    // if (testX > this.mapGen.mapSize - 1) {
    //   this.mapGen.move()

    //   let data = this.mapGen.getObjectData()

    //   this.object_data = data[0]
    //   this.texture_data = data[1]
    //   this.object_count = this.object_data.length / 16
    // }

    // this.lastX = this.player.position[0]
  }

  moveMap() {
    this.mapGen.move()
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
