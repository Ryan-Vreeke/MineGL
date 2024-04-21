import shader from "./shaders/shaders.wgsl"
import { SquareMesh } from "./meshes/square_mesh"
import { mat4 } from "gl-matrix"

export class Renderer {
  canvas: HTMLCanvasElement

  adapter!: GPUAdapter
  device!: GPUDevice
  context!: GPUCanvasContext
  format!: GPUTextureFormat

  uniformBuffer!: GPUBuffer
  bindGroup!: GPUBindGroup
  pipeline!: GPURenderPipeline

  squareMesh!: SquareMesh
  t: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.t = 0.0
  }

  async Initialize() {
    await this.setupDevice()

    this.createAssets()

    await this.makePipeline()

    this.render()
  }

  async setupDevice() {
    this.adapter = <GPUAdapter>await navigator.gpu.requestAdapter()
    this.device = <GPUDevice>await this.adapter!.requestDevice()

    this.context = <GPUCanvasContext>this.canvas.getContext("webgpu")
    this.format = navigator.gpu.getPreferredCanvasFormat()
    this.context.configure({
      device: this.device,
      format: this.format,
      alphaMode: "opaque",
    })
  }

  async makePipeline() {
    this.uniformBuffer = this.device.createBuffer({
      size: 64 * 3,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: {},
        },
      ],
    })

    this.bindGroup = this.device.createBindGroup({
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: this.uniformBuffer,
          },
        },
      ],
    })

    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    })

    this.pipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: this.device.createShaderModule({
          code: shader,
        }),
        entryPoint: "vs_main",
        buffers: [this.squareMesh.bufferLayout],
      },
      fragment: {
        module: this.device.createShaderModule({
          code: shader,
        }),
        entryPoint: "fs_main",
        targets: [
          {
            format: this.format,
          },
        ],
      },
      primitive: {
        topology: "triangle-list",
      },
    })
  }

  createAssets() {
    this.squareMesh = new SquareMesh(this.device)
  }

  render = () => {
    this.t += 0.01
    if (this.t > 2.0 * Math.PI) {
      this.t -= 2.0 * Math.PI
    }

    const projection = mat4.create()
    const view = mat4.create()
    const model = mat4.create()

    mat4.perspective(projection, Math.PI / 4, 800 / 600, 0.1, 10)
    mat4.lookAt(view, [-2, 0, 2], [0, 0, 0], [0, 0, 1])
    mat4.rotate(model, model, this.t, [0, 0, 1])

    this.device.queue.writeBuffer(this.uniformBuffer, 0, <ArrayBuffer>model)
    this.device.queue.writeBuffer(this.uniformBuffer, 64, <ArrayBuffer>view)
    this.device.queue.writeBuffer(
      this.uniformBuffer,
      128,
      <ArrayBuffer>projection
    )

    const commandEncoder: GPUCommandEncoder = this.device.createCommandEncoder()
    const textureView: GPUTextureView = this.context
      .getCurrentTexture()
      .createView()

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: [0, 0, 0, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    }

    const passEncoder: GPURenderPassEncoder =
      commandEncoder.beginRenderPass(renderPassDescriptor)

    passEncoder.setPipeline(this.pipeline)
    passEncoder.setVertexBuffer(0, this.squareMesh.buffer)
    passEncoder.setBindGroup(0, this.bindGroup)
    passEncoder.draw(6)
    passEncoder.end()

    this.device.queue.submit([commandEncoder.finish()])
    requestAnimationFrame(this.render)
  }
}
