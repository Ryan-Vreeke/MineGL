import { vec3, mat4 } from "gl-matrix"
import { Deg2Rad } from "./math_stuff"

export class Block {
  position: vec3
  faces: Face[]

  constructor(position: vec3) {
    this.position = position
    this.faces = []

    this.faces.push( new Face([position[0], position[1], position[2]], [Deg2Rad(0), Deg2Rad(0), Deg2Rad(-90)]))
    this.faces.push( new Face([position[0], position[1], position[2]], [0, 0, Deg2Rad(180)]))
    this.faces.push( new Face([position[0], position[1], position[2]], [0, Deg2Rad(0), 0]))
    this.faces.push( new Face([position[0], position[1], position[2]], [Deg2Rad(0), Deg2Rad(0), Deg2Rad(90)]))
    this.faces.push( new Face([position[0], position[1], position[2]], [Deg2Rad(-90), 0, 0]))
    this.faces.push( new Face([position[0], position[1], position[2]], [Deg2Rad(90), 0, 0]))
  }

  get_faces(): Face[] {
    return this.faces
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
