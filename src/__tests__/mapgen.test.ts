import { MapGen } from "../model/MapGenerator"
import { describe, test, expect, beforeEach } from "@jest/globals"
import { Chunk } from "../model/Chunk"

describe("MapGen Tests", () => {
  var map: MapGen
  var chunk: Chunk
  var chunk2: Chunk

  beforeEach(() => {
    map = new MapGen(16, 2)

    map.createChunk(1, 1)
    map.createChunk(1, -1)
    map.createChunk(-1, -1)
    map.createChunk(-1, 1)

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
    const mm = new MapGen(16, 2)
    mm.createChunk(1, 1)
    mm.createChunk(1, -1)
    mm.createChunk(-1, -1)
    mm.createChunk(-1, 1)

    expect(mm.mapSize).toBe(2)

    mm.createChunk(2, 2)
    expect(mm.mapSize).toBe(4)

    const testChunk = mm.getChunk(2, 2)
    expect(testChunk.x).toBe(2)
    expect(testChunk.y).toBe(2)
  })

  test("CreateChunk of Size 16", () => {
    expect(chunk.size).toEqual(16)
  })

  test("Blocks Placed In World", () => {
    const blocks = chunk.blocks
    const b2 = chunk2.blocks

    expect(blocks[0].position).toEqual([ 0 + chunk.x * chunk.size, 0 + chunk.y * chunk.size, 0, ])
    expect(b2[0].position).toEqual([ 0 + chunk2.x * chunk2.size, 0 + chunk2.y * chunk2.size, 0, ])
  })

  test("Get blocks", () => {
    const blocks = map.getBlocks()
    
    expect(blocks.length).toBe(map.chunkSize * map.chunkSize * map.mapSize * map.mapSize)
  })
})
