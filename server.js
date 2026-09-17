import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))
const port = Number(process.env.PORT || 3000)
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
}

createServer(async (request, response) => {
  const requestedPath = request.url === '/' ? '/index.html' : request.url.split('?')[0]
  const filePath = normalize(join(root, requestedPath))

  if (!filePath.startsWith(root)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  try {
    const content = await readFile(filePath)
    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    })
    response.end(content)
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
}).listen(port, () => {
  console.log(`ParcelGrid dashboard running at http://localhost:${port}`)
})
