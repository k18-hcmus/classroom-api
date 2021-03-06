import fs from 'fs'
import path from 'path'

function requireDir(dir, excepts = []) {
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === '.js' && !excepts.includes(file))
    .map((file) => require(path.join(dir, file)))
}

export { requireDir }
