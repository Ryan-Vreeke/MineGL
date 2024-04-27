import { App } from "./controllers/app"

const canvas = document.querySelector("canvas") as HTMLCanvasElement

const app = new App(canvas)

app.run()
