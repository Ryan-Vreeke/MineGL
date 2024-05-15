import { Block, Face } from "./Block"
import { Deg2Rad } from "./math_stuff"

export class Chunk {
  blocks: Block[][][]
  size: number
  x: number
  y: number

  constructor(x: number, y: number, size: number) {
    this.blocks = []

    this.size = size
    this.x = x
    this.y = y
  }

  createChunk(height: (xc: number, yc: number) => number) {
    for (var i = 0; i < this.size; i++) {
      this.blocks[i] = []
      for (var j = 0; j < this.size; j++) {
        this.blocks[i][j] = []
        const globalX: number = this.x * this.size + i
        const globalY: number = this.y * this.size + j
        let z = height(globalX, globalY)

        for (var k = z; k >= 0; k--) {
          var type: string
          if (k == z) {
            type = "grass" //TOP: 0. Sides: 3/16
          } else if (k < z && k > z - 5) {
            type = "dirt" //BLOCK: 2/16
          } else {
            type = "stone" //BLOCK 1/16
          }

          this.blocks[i][j][k] = new Block([globalX, globalY, k], type)
        }
      }
    }
  }

  getBlock(x: number, y: number, z: number): boolean {
    let cx = x - this.size * this.x
    let cy = y - this.size * this.y

    try {
      if (this.blocks[cx][cy][z] == null) {
        return false
      }
    } catch (error) {
      console.log(cx + ": " + cy)
    }

    return true
  }
  blockAbove(x: number, y: number, z: number): boolean {
    return this.blocks[x][y][z + 1] == null
  }

  blockBelow(x: number, y: number, z: number): boolean {
    return this.blocks[x][y][z - 1] == null
  }

  neighbors(x: number, y: number, z: number): Face[] {
    var faces: Face[] = []
    const block: Block = this.blocks[x][y][z]
    if (block == null) {
      return []
    }

    let faceType
    if (block.type == "grass") {
      faceType = "grass-side"
    } else {
      faceType = block.type
    }

    if (this.blockAbove(x, y, z)) {
      faces.push(
        new Face(
          [block.position[0], block.position[1], block.position[2] + 0.5],
          [Deg2Rad(0), Deg2Rad(0), Deg2Rad(0)],
          "grass-top"
        )
      ) //UP
    }

    if (x != 0 && this.blocks[x - 1][y][z] == null) {
      faces.push(
        new Face(
          [block.position[0] - 0.5, block.position[1], block.position[2]],
          [Deg2Rad(90), Deg2Rad(-90), 0],
          faceType
        )
      )
    }

    if (x != this.size - 1 && this.blocks[x + 1][y][z] == null) {
      faces.push(
        new Face(
          [block.position[0] + 0.5, block.position[1], block.position[2]],
          [Deg2Rad(90), Deg2Rad(90), 0],
          faceType
        )
      ) //x+
    }

    if (y != 0 && this.blocks[x][y - 1][z] == null) {
      faces.push(
        new Face(
          [block.position[0], block.position[1] - 0.5, block.position[2]],
          [Deg2Rad(90), Deg2Rad(0), Deg2Rad(0)],
          faceType
        )
      ) //BOTTOM
    }

    if (y != this.size - 1 && this.blocks[x][y + 1][z] == null) {
      faces.push(
        new Face(
          [block.position[0], block.position[1] + 0.5, block.position[2]],
          [Deg2Rad(-90), Deg2Rad(0), Deg2Rad(180)],
          faceType
        )
      ) //TOP
    }

    if (z != 0 && this.blocks[x][y][z - 1] == null) {
      faces.push(
        new Face(
          [block.position[0], block.position[1], block.position[2] - 0.5],
          [Deg2Rad(0), Deg2Rad(180), Deg2Rad(0)],
          faceType
        )
      ) //Down
    }

    return faces
  }
}
