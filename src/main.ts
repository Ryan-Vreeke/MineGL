import shader from "./shaders/shaders.wgsl"
import { TriangleMesh } from "./meshes/triangle_mesh"


const Init = async () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement
  const adapter = await navigator.gpu.requestAdapter()
  const device = await adapter!.requestDevice()
  const triangleMesh : TriangleMesh = new TriangleMesh(device)

  const context = canvas.getContext("webgpu") as GPUCanvasContext

  const devicePixelRatio = window.devicePixelRatio
  canvas.width = canvas.clientWidth * devicePixelRatio
  canvas.height = canvas.clientHeight * devicePixelRatio
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat()

  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "opaque",
  })

  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: shader,
      }),
      entryPoint: "vs_main",
      buffers: [triangleMesh.bufferLayout]
    },
    fragment: {
      module: device.createShaderModule({
        code: shader,
      }),
      entryPoint: "fs_main",
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
    },
  })

  function frame() {
    const commandEncoder = device.createCommandEncoder()
    const textureView = context.getCurrentTexture().createView()

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

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    passEncoder.setPipeline(pipeline)
    passEncoder.setVertexBuffer(0, triangleMesh.buffer)
    passEncoder.draw(3)
    passEncoder.end()

    device.queue.submit([commandEncoder.finish()])
    requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}

Init()
