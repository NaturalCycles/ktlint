/*

yarn tsn src/install

 */

import * as fs from 'fs'
import { _hb } from '@naturalcycles/js-lib'
import { _pipeline, getGot, runScript } from '@naturalcycles/nodejs-lib'
import { ktlintPath } from './paths'

runScript(async () => {
  if (fs.existsSync(ktlintPath)) {
    // const {size, mode} = fs.statSync(ktlintPath)
    // return console.log(`ktlint exists, size: ${_hb(size)} mode ${mode}`)
    return
  }

  const got = getGot({
    debug: true,
    logWithSearchParams: false,
  })

  const ktlintVersion = '0.43.2'
  console.log(`downloading ktlint ${ktlintVersion} from github, may take some time...`)

  const url = `https://github.com/pinterest/ktlint/releases/download/${ktlintVersion}/ktlint`

  await _pipeline([got.stream.get(url), fs.createWriteStream(ktlintPath)])

  console.log(`ktlint downloaded to ${ktlintPath}`)

  if (!fs.existsSync(ktlintPath)) {
    console.log(`something went wrong, ktlint not found at path: ${ktlintPath}`)
    return process.exit(15)
  }

  const { size } = fs.statSync(ktlintPath)
  console.log(`ktlint size: ${_hb(size)}`)

  chmod()
})

function chmod() {
  fs.chmodSync(ktlintPath, '775')
}
