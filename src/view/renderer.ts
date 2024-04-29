import shader from "./shaders/shaders.wgsl"
import { SquareMesh } from "./meshes/square_mesh"
import { mat4 } from "gl-matrix"
import { Camera } from "../model/Camera"
import { Material } from "../model/material"

export class Renderer {
  canvas: HTMLCanvasElement

  adapter!: GPUAdapter
  device!: GPUDevice
  context!: GPUCanvasContext
  format!: GPUTextureFormat

  //Depth stencil obj
  depthStencilState!: GPUDepthStencilState
  depthStencilBuffer!: GPUTexture
  depthStencilView!: GPUTextureView
  depthStencilAttachment!: GPURenderPassDepthStencilAttachment

  uniformBuffer!: GPUBuffer
  bindGroup!: GPUBindGroup
  pipeline!: GPURenderPipeline

  squareMesh!: SquareMesh
  material!: Material
  objectBuffer!: GPUBuffer
  objCount: number

  constructor(canvas: HTMLCanvasElement, objCount: number) {
    this.canvas = canvas
    this.objCount = objCount
  }

  async Initialize() {
    await this.setupDevice()
    await this.createAssets()
    await this.makeDepthBufferResources()
    await this.makePipeline()
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

  async makeDepthBufferResources() {
    this.depthStencilState = {
      format: "depth24plus-stencil8",
      depthWriteEnabled: true,
      depthCompare: "less-equal",
    }

    const size: GPUExtent3D = {
      width: this.canvas.width,
      height: this.canvas.height,
      depthOrArrayLayers: 1,
    }
    const depthBufferDescriptor: GPUTextureDescriptor = {
      size: size,
      format: "depth24plus-stencil8",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    }

    this.depthStencilBuffer = this.device.createTexture(depthBufferDescriptor)

    const depthTextureViewDescriptor: GPUTextureViewDescriptor = {
      format: "depth24plus-stencil8",
      dimension: "2d",
      aspect: "all",
    }

    this.depthStencilView = this.depthStencilBuffer.createView(
      depthTextureViewDescriptor
    )
    this.depthStencilAttachment = {
      view: this.depthStencilView,
      depthClearValue: 1.0,
      depthLoadOp: "clear",
      depthStoreOp: "store",
      stencilLoadOp: "clear",
      stencilStoreOp: "discard",
    }
  }

  async makePipeline() {
    this.uniformBuffer = this.device.createBuffer({
      size: 64 * 2,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.VERTEX,
          buffer: {},
        },
        {
          binding: 1,
          visibility: GPUShaderStage.VERTEX,
          buffer: {
            type: "read-only-storage",
            hasDynamicOffset: false,
          },
        },
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {},
        },
        {
          binding: 3,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: {},
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
        {
          binding: 1,
          resource: {
            buffer: this.objectBuffer,
          },
        },
        {
          binding: 2,
          resource: this.material.view,
        },
        {
          binding: 3,
          resource: this.material.sampler,
        },
      ],
    })

    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout],
    })

    this.pipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      depthStencil: this.depthStencilState,
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

  async createAssets() {
    this.squareMesh = new SquareMesh(this.device)
    this.material = new Material()
    await this.material.initialize(
      this.device,
      "dist/textures/grass_block_side.png"
    )

    const modelBufferDescriptor: GPUBufferDescriptor = {
      size: 64 * this.objCount,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }

    this.objectBuffer = this.device.createBuffer(modelBufferDescriptor)
  }

  async render(blocks: Float32Array, object_count: number, camera: Camera) {
    const projection = mat4.create()

    mat4.perspective(projection, Math.PI / 4, 800 / 600, 0.1, 100)

    this.device.queue.writeBuffer(
      this.objectBuffer,
      0,
      blocks,
      0,
      blocks.length
    )
    this.device.queue.writeBuffer(
      this.uniformBuffer,
      0,
      <ArrayBuffer>camera.get_model()
    )
    this.device.queue.writeBuffer(
      this.uniformBuffer,
      64,
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
          clearValue: [0.44, 0.7, 1, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
      depthStencilAttachment: this.depthStencilAttachment,
    }

    const passEncoder: GPURenderPassEncoder =
      commandEncoder.beginRenderPass(renderPassDescriptor)

    passEncoder.setPipeline(this.pipeline)
    passEncoder.setVertexBuffer(0, this.squareMesh.buffer)
    passEncoder.setBindGroup(0, this.bindGroup)
    passEncoder.draw(36, object_count, 0, 0)
    passEncoder.end()

    this.device.queue.submit([commandEncoder.finish()])
  }
}
