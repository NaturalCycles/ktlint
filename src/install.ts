/*

yarn tsn src/install

 */

import * as fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import got from 'got'
import { ktlintPath } from './paths'

const _pipeline = promisify(pipeline) as any

void (async () => {
  if (fs.existsSync(ktlintPath)) {
    // const {size, mode} = fs.statSync(ktlintPath)
    // return console.log(`ktlint exists, size: ${_hb(size)} mode ${mode}`)
    return
  }

  const ktlintVersion = '0.43.2'
  console.log(`downloading ktlint ${ktlintVersion} from github, may take some time...`)

  const url = `https://github.com/pinterest/ktlint/releases/download/${ktlintVersion}/ktlint`
  console.log(url)

  await _pipeline(got.stream.get(url), fs.createWriteStream(ktlintPath))

  console.log(`ktlint downloaded to ${ktlintPath}`)

  if (!fs.existsSync(ktlintPath)) {
    console.log(`something went wrong, ktlint not found at path: ${ktlintPath}`)
    return process.exit(15)
  }

  const { size } = fs.statSync(ktlintPath)
  console.log(`ktlint size: ${_hb(size)}`)

  chmod()
})()

function chmod() {
  fs.chmodSync(ktlintPath, '775')
}

// from js-lib
function _hb(b = 0): string {
  if (b < 1024) return `${Math.round(b)} byte`
  if (b < 1024 ** 2) return `${(b / 1024).toPrecision(3)} Kb`
  if (b < 1024 ** 3) return `${(b / 1024 ** 2).toPrecision(3)} Mb`
  if (b < 1024 ** 4) return `${(b / 1024 ** 3).toPrecision(3)} Gb`
  if (b < 1024 ** 5) return `${(b / 1024 ** 4).toPrecision(3)} Tb`
  return `${Math.round(b / 1024 ** 4)} Tb`
}
