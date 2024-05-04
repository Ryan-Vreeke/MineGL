import { Renderer } from "../view/renderer"
import { Scene } from "../model/scene"
export class App {
  canvas: HTMLCanvasElement
  renderer: Renderer
  scene: Scene

  forwardAmount: number
  sideAmount: number
  scale: number

  constructor(canvas: HTMLCanvasElement) {
    const chunkSize: number = 16
    const chunkCount: number = 2

    this.canvas = canvas
    this.renderer = new Renderer(canvas, (chunkCount * chunkCount) * (chunkSize * chunkSize))
    this.renderer.Initialize()

    this.scene = new Scene(chunkCount, chunkSize)
    this.forwardAmount = 0
    this.sideAmount = 0
    this.scale = 0.5

    document.addEventListener("keydown", this.keyDown.bind(this))
    document.addEventListener("keyup", this.keyUp.bind(this))

    this.canvas.onclick = () => {
      this.canvas.requestPointerLock()
    }
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this))
  }

  run = () => {
    var running: boolean = true

    this.scene.update()
    this.scene.player_move(
      this.sideAmount * this.scale,
      this.forwardAmount * this.scale
    )

    this.renderer.render(
      this.scene.get_blocks(),
      this.scene.object_count,
      this.scene.get_player()
    )

    if (running) {
      requestAnimationFrame(this.run)
    }
  }

  handleMouseMove(event: MouseEvent) {
    this.scene.player_look(event.movementX / 10, event.movementY / -10)
  }

  keyUp(event: KeyboardEvent) {
    this.forwardAmount = 0
    this.sideAmount = 0
  }

  keyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
        this.forwardAmount = 1
        break
      case "a":
        this.sideAmount = -1
        break
      case "s":
        this.forwardAmount = -1
        break
      case "d":
        this.sideAmount = 1
        break
    }
  }
}
