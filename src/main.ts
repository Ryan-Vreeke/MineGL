import { App } from "./controllers/app"

const canvas = document.querySelector("canvas") as HTMLCanvasElement
const fps = document.getElementById("fps") as HTMLElement

fps.textContent = '0'

const app = new App(canvas, fps)

requestAnimationFrame(app.run)
