import fs from 'fs'
import path from 'path'

const swaggerSpec = fs.readFileSync(path.resolve('./swagger.json'))

export function getSwaggerSpec() {
  return JSON.parse(swaggerSpec)
}
\