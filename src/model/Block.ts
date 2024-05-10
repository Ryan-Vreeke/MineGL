import { vec3, mat4 } from "gl-matrix"

export class Block {
  position: vec3

  constructor(position: vec3) {
    this.position = position
  }
}

export class Face {
  position: vec3
  model: mat4

  constructor(position: vec3, rotation: vec3) {
    this.position = position 

    this.model = mat4.create()
    mat4.translate(this.model, this.model, this.position)
    mat4.rotateX(this.model, this.model, rotation[0])
    mat4.rotateY(this.model, this.model, rotation[1])
    mat4.rotateZ(this.model, this.model, rotation[2])
  }

  get_model(): mat4 {
    return this.model
  }
}
