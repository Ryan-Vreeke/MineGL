import { Face } from "./Block"
import { SimplexNoise } from "ts-perlin-simplex"
import { Block } from "./Block"

export class MapGen {
  chunkSize: number
  faces: Face[]
  blocks: number[][]
  
  mapSize: number
  simplex: any
  lacunarity: number
  persistance: number

  constructor(chunkSize: number, mapSize: number) {
    this.chunkSize = chunkSize
    this.mapSize = mapSize
    this.faces = []
    this.blocks = []
    this.simplex = new SimplexNoise()

    this.lacunarity = 2
    this.persistance = 0.5


    for(var i = 0; i < chunkSize; i++){
      for(var j = 0; j < chunkSize; j++){
        this.blocks[i * this.chunkSize + j] = new Array(chunkSize)
        this.blocks[i * this.chunkSize + j].fill(0 as number)

        for(var k = 0; k < chunkSize; k++){
          this.blocks[i * this.chunkSize + j][k] = 1
        }
      }
    }
  }

  get_objCount(): number{
    return this.faces.length
  }

  heightMap(x:number, y: number): number{
    return 0
  }

  // heightMap(x:number, y: number): number {
  //   var z0: number = this.octave(x, y, 0)
  //   var z1: number = this.octave(x, y, 1)
  //   var z2: number = this.octave(x, y, 2)

  //   var z: number = z0 + z1 + z2
  //   return Math.floor(z * 50)
  // }

  octave(x: number, y: number, order: number): number {
    let hz: number = Math.pow(this.lacunarity, order)
    let amp: number = Math.pow(this.persistance, order)
    return this.simplex.noise((x / 150) * hz, (y / 150) * hz) * amp
  }

  getFaces(): Face[] {
    return this.faces
  }

  getObjectData(): Float32Array {
    const object_data: Float32Array = new Float32Array(
      16 * this.mapSize * this.mapSize * this.chunkSize * this.chunkSize * 6
    )
    var i: number = 0

    for(var i = 0; i < this.chunkSize; i++){
      for(var j = 0; j < this.chunkSize; j++){
        for(var k = 0; k < this.chunkSize; k++){
          const isBlock = this.blocks[i * this.chunkSize + j][k]

          if(thi)
        }
      }
    }


    this.faces.forEach((face) => {
      var model = face.get_model()
      for (var j: number = 0; j < 16; j++) {
        object_data[16 * i + j] = <number>model.at(j)
      }
      i++
    })

    return object_data
  }
}
