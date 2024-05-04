import { MapGen } from "../model/MapGenerator"
import { describe, test, expect, beforeAll } from "@jest/globals"
import { Chunk } from "../model/Chunk"
import { vec3 } from "gl-matrix"

describe("MapGen Tests", () => {
  var map: MapGen
  var chunk: Chunk
  var chunk2: Chunk

  beforeAll(() => {
    map = new MapGen(16, 1)
    map.createChunk(0, 0)
    map.createChunk(1, 0)
    chunk = map.getChunk(0, 0)
    chunk2 = map.getChunk(1, 0)
  })

  test("chunk create in world", () => {
    expect(chunk.x).toEqual(0)
    expect(chunk.y).toEqual(0)

    expect(chunk2.x).toEqual(1)
    expect(chunk2.y).toEqual(0)
  })

  test("CreateChunk of Size 16", () => {
    expect(chunk.size).toEqual(16)
  })

  test("Blocks Placed In World", () => {
    const blocks = chunk.blocks
    const b2 = chunk2.blocks

    expect(blocks[0].position).toEqual([0 + (chunk.x * chunk.size), 0 + (chunk.y * chunk.size), 0])
    expect(b2[0].position).toEqual([0 + (chunk2.x * chunk2.size), 0 + (chunk2.y * chunk2.size), 0])
  })
})
