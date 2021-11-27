import { LsifReader, noopTransformer } from "../src/reader"
import * as fs from "fs"

let r = new LsifReader()
let content = fs.readFileSync("sample/sample.json").toString()
r.load(content, () => noopTransformer)
let uri = "file:///d:/Programowanie/Projekty/lsif-reader/src/reader.ts"

let result = r.documentSymbols(uri)
console.log(result)

let hoverResult = r.hover(uri, { line: 776, character: 24 })
console.log(hoverResult)
