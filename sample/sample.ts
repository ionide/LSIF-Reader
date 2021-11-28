import { LsifReader, UriTransformer } from "../src/reader"
import { URI } from "vscode-uri"
import * as fs from "fs"
import * as path from "path"

let r = new LsifReader()
let content = fs.readFileSync("sample/sample.json").toString()

let transformerFactory = (workspaceUri: string): UriTransformer => {
    return {
        toDatabase: (uri) => {
            let wu = URI.parse(workspaceUri).fsPath
            let joined = path.join(wu, uri).replace("\\", "/")
            let nu = URI.file(joined).toString(true)

            return nu
        },
        fromDatabase: (uri) => {
            let result = path.relative(workspaceUri, uri).replace("\\", "/")
            return result
        },
    }
}

r.load(content, transformerFactory)
let uri = "src/reader.ts"

let result = r.documentSymbols(uri)
console.log(result)

let hoverResult = r.hover(uri, { line: 775, character: 24 })
console.log(hoverResult)

let referencesResult = r.references(uri, { line: 775, character: 24 }, { includeDeclaration: true })
console.log(referencesResult)
