/*

yarn tsn install

 */

import * as fs from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import got from 'got'
import { ktlintPath } from '../src/paths'

const _pipeline = promisify(pipeline) as any

// eslint-disable-next-line unicorn/prefer-top-level-await
void (async () => {
  if (fs.existsSync(ktlintPath)) {
    // const {size, mode} = fs.statSync(ktlintPath)
    // return console.log(`ktlint exists, size: ${_hb(size)} mode ${mode}`)
    // todo: check if installed version is the same!
    return
  }

  // 0.43.2 sometimes fails with error on Java 16+:
  // https://github.com/pinterest/ktlint/issues/1195
  // Hence, reverting to 0.40.0
  // const ktlintVersion = '0.43.2'
  const ktlintVersion = '0.48.2'
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
