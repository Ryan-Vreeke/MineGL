import { MapGen } from "../model/MapGenerator"
import { describe, test, expect, beforeEach } from "@jest/globals"
import { Chunk } from "../model/Chunk"

describe("MapGen Tests", () => {
  var map: MapGen
  var chunk: Chunk
  var chunk2: Chunk
  var c0: Chunk

  beforeEach(() => {
    map = new MapGen(16, 3)

    map.createChunk(0, 0)
    map.createChunk(1, 1)
    map.createChunk(1, -1)
    map.createChunk(-1, -1)
    map.createChunk(-1, 1)

    c0 = map.getChunk(0,0)
    chunk = map.getChunk(1, 1)
    chunk2 = map.getChunk(1, -1)
  })

  test("chunk create in world", () => {
    expect(chunk.x).toEqual(1)
    expect(chunk.y).toEqual(1)

    expect(chunk2.x).toEqual(1)
    expect(chunk2.y).toEqual(-1)
  })

  test("square test", () => {
    const newMap = new MapGen(16, 2)
    newMap.createChunk(1, 1)
    newMap.createChunk(1, -1)
    newMap.createChunk(-1, -1)
    newMap.createChunk(-1, 1)

    const c1 = newMap.getChunk(1, 1)
    const c2 = newMap.getChunk(1, -1)
    const c3 = newMap.getChunk(-1, -1)
    const c4 = newMap.getChunk(-1, 1)

    expect(c1.x).toBe(1)
    expect(c1.y).toBe(1)
    expect(c2.x).toBe(1)
    expect(c2.y).toBe(-1)
    expect(c3.x).toBe(-1)
    expect(c3.y).toBe(-1)
    expect(c4.x).toBe(-1)
    expect(c4.y).toBe(1)
  })

  test("Growing map size", () => {
    const mm = new MapGen(16, 3)
    mm.createChunk(1, 1)
    mm.createChunk(0, 0)
    mm.createChunk(-1, -1)

    expect(mm.mapSize).toBe(3)

    mm.createChunk(2, 2)
    expect(mm.mapSize).toBe(5)

    const testChunk = mm.getChunk(2, 2)
    expect(testChunk.x).toBe(2)
    expect(testChunk.y).toBe(2)
  })

  test("CreateChunk of Size 16", () => {
    expect(chunk.size).toEqual(16)
  })

  test("Blocks Placed In World", () => {
    const blocks = c0.blocks

    expect(blocks[0].position).toEqual([ -8, -8, 0, ])
    expect(blocks[255].position).toEqual([ 7, 7, 0, ])
  })

  test("Get blocks", () => {
    const mm = new MapGen(16, 3)
    for (var i: number = -1; i < 2; i++) {
      for (var j: number = -1; j < 2; j++) {
        mm.createChunk(i, j)
      }
    }
    const blocks = mm.getBlocks()

    expect(blocks.length).toBe(
      mm.chunkSize * mm.chunkSize * mm.mapSize * mm.mapSize
    )
  })
})
