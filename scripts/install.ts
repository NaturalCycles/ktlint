/*

yarn tsn install

 */

import fs from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { _hb, getFetcher } from '@naturalcycles/js-lib'
import { ktlintPath } from '../src/paths'

// eslint-disable-next-line unicorn/prefer-top-level-await
void (async () => {
  if (fs.existsSync(ktlintPath)) {
    const { size } = fs.statSync(ktlintPath)
    return console.log(`ktlint exists, size: ${_hb(size)}`)
    // todo: check if installed version is the same!
  }

  // 0.43.2 sometimes fails with error on Java 16+:
  // https://github.com/pinterest/ktlint/issues/1195
  // Hence, reverting to 0.40.0
  // const ktlintVersion = '0.43.2'
  const ktlintVersion = '1.3.1'
  console.log(`downloading ktlint ${ktlintVersion} from github, may take some time...`)

  const url = `https://github.com/pinterest/ktlint/releases/download/${ktlintVersion}/ktlint`
  console.log(url)

  const fetcher = getFetcher({
    logRequest: true,
    logResponse: true,
  })

  await pipeline([
    Readable.fromWeb((await fetcher.getReadableStream(url)) as any),
    fs.createWriteStream(ktlintPath),
  ])

  console.log(`ktlint downloaded to ${ktlintPath}`)

  if (!fs.existsSync(ktlintPath)) {
    console.log(`something went wrong, ktlint not found at path: ${ktlintPath}`)
    return process.exit(15)
  }

  const { size } = fs.statSync(ktlintPath)
  console.log(`ktlint size: ${_hb(size)}`)

  chmod()
})()

function chmod(): void {
  fs.chmodSync(ktlintPath, '775')
}
