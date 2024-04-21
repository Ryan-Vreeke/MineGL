import { Renderer } from "./renderer"

const canvas = document.querySelector("canvas") as HTMLCanvasElement

const renderer = new Renderer(canvas)
renderer.Initialize()
