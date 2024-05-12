import { Renderer } from "../view/renderer"
import { Scene } from "../model/scene"
import { Physics } from "../model/Physics"

const chunkSize: number = 16
const chunkCount: number = 10

export class App {
  canvas: HTMLCanvasElement
  fpsCounter: HTMLElement
  renderer: Renderer
  scene: Scene
  then: number
  fps: number

  forwardAmount: number
  sideAmount: number
  physics: Physics

  constructor(canvas: HTMLCanvasElement, fpsCounter: HTMLElement) {
    this.then = 0
    this.fps = 0
    this.fpsCounter = fpsCounter

    this.scene = new Scene(chunkCount, chunkSize)
    this.physics = new Physics()

    this.canvas = canvas
    this.renderer = new Renderer(canvas, this.scene.object_count)
    this.renderer.Initialize()

    this.forwardAmount = 0
    this.sideAmount = 0

    window.setInterval(() => {
      this.fpsCounter.textContent = `fps:${this.fps.toFixed(1)}`
    }, 200)

    document.addEventListener("keydown", this.keyDown.bind(this))
    document.addEventListener("keyup", this.keyUp.bind(this))

    this.canvas.onclick = () => {
      this.canvas.requestPointerLock()
    }
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this))
  }

  run = (now: number) => {
    now *= 0.001
    const deltaTime = now - this.then
    this.fps = 1 / deltaTime
    this.then = now

    var running: boolean = true

    this.scene.update()
    this.scene.player_move(this.sideAmount, this.forwardAmount)

    this.renderer.render(
      this.scene.get_blocks(),
      this.scene.get_textures(),
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
