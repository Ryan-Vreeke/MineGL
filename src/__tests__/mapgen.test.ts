import { MapGen } from "../model/MapGenerator"
import { describe, test, expect, beforeEach } from "@jest/globals"
import { Chunk } from "../model/Chunk"
import { Block } from "../model/Block"

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
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    for(var i = 1; i < 5; i++){
      for(var j = 1; j < 5; j++){
        expect(c.at(i, j)).toBe(1)
      }
    }
  })

  test("Chunk Size + Space", () => {
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    expect((c.size + 2) * (c.size + 2)).toBe(c.blocks.length)
  })

  test("Neighbors top left corner", () => {
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    const n = c.getNeighbors(1,1)

    expect(n[0]).toBe(0)
    expect(n[1]).toBe(1)
    expect(n[2]).toBe(0)
    expect(n[3]).toBe(1)

  })

  test("Neighbors middle edge", () => {
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    const n = c.getNeighbors(4,2)

    expect(n[0]).toBe(1)
    expect(n[1]).toBe(0)
    expect(n[2]).toBe(1)
    expect(n[3]).toBe(1)
  })

  test("Neighbors middle", () => {
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    const n = c.getNeighbors(2,2)

    expect(n[0]).toBe(1)
    expect(n[1]).toBe(1)
    expect(n[2]).toBe(1)
    expect(n[3]).toBe(1)
  })

  test("Neighbors bottom right corner", () => {
    const mm = new MapGen(4, 3)
    const c: Chunk = mm.createChunk(0,0)

    const n = c.getNeighbors(4,4)

    expect(n[0]).toBe(1)
    expect(n[1]).toBe(0)
    expect(n[2]).toBe(1)
    expect(n[3]).toBe(0)
  })

  test("Chunk White Space", () => {
    const mm = new MapGen(16, 3)
    const c: Chunk = mm.createChunk(0,0)


    for(var i = 0; i < c.size + 2; i++){
      expect(c.at(0, i)).toBe(0)
      expect(c.at(c.size + 1, i)).toBe(0)
    }
  })

  test("Get Corner Block Faces", () => {
    const mm = new MapGen(16, 3)
    const c: Chunk = mm.createChunk(0,0)
    const n = c.getNeighbors(1,1)//0 1 0 1 L R T B
    const b: Block = new Block([0,0,0], n)

    expect(b.get_faces().length).toBe(4)
    expect(b.get_faces()[0].position[0]).toBe(-0.5)
    expect(b.get_faces()[1].position[1]).toBe(-0.5)
  })


  test("Get middle Block Faces", () => {
    const mm = new MapGen(16, 3)
    const c: Chunk = mm.createChunk(0,0)
    const n = c.getNeighbors(2,2)//1 1 1 1 L R T B
    const b: Block = new Block([0,0,0], n)

    expect(b.get_faces().length).toBe(2)
  })

  test("Single Block Faces", () => {
    const mm = new MapGen(16, 3)
    const c: Chunk = mm.createChunk(0,0)
    const b: Block = new Block([0,0,0], [0,0,0,0])

    expect(b.get_faces().length).toBe(6)
  })
})
