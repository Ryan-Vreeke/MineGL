import { vec3, mat4 } from "gl-matrix"
import { Deg2Rad } from "./math_stuff"

export class Block {
  position: vec3
  faces: Face[]

  constructor(position: vec3) {
    this.position = position
    this.faces = []
    
    var faceDir: Face[] = []


    // faceDir.push( new Face([position[0] - 0.5, position[1], position[2]], [Deg2Rad(-90), Deg2Rad(-90), 0]))//x-
    // faceDir.push( new Face([position[0] + 0.5, position[1], position[2]], [Deg2Rad(-90), Deg2Rad(90), 0]))//x+

    // faceDir.push( new Face([position[0], position[1] - 0.5, position[2]], [Deg2Rad(90), Deg2Rad(0), Deg2Rad(180)]))//BOTTOM
    // faceDir.push( new Face([position[0], position[1] + 0.5, position[2]], [Deg2Rad(-90), Deg2Rad(0), Deg2Rad(0)]))//TOP

    // faceDir.push( new Face([position[0], position[1], position[2] + 0.5], [Deg2Rad(0), Deg2Rad(0), Deg2Rad(0)]))//UP
    // faceDir.push( new Face([position[0], position[1], position[2] - 0.5], [Deg2Rad(0), Deg2Rad(180), Deg2Rad(0)]))//Down

    // for(var i = 0; i < nBlocks.length; i++){
    //   if(nBlocks[i] == -100){
    //     this.faces.push(faceDir[i])
    //   }
    // }

    // this.faces.push(faceDir[4])
    // this.faces.push(faceDir[5])
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
