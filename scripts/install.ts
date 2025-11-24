/*

pn tsx scripts/install.ts

 */

import fs from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { _hb } from '@naturalcycles/js-lib'
import { getFetcher } from '@naturalcycles/js-lib/http'
import { ktlintPath } from '../src/paths.js'

await install()

async function install(): Promise<void> {
  if (fs.existsSync(ktlintPath)) {
    const { size } = fs.statSync(ktlintPath)
    return console.log(`ktlint exists, size: ${_hb(size)}`)
    // todo: check if installed version is the same!
  }

  const ktlintVersion = '1.8.0'
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
}

function chmod(): void {
  fs.chmodSync(ktlintPath, '775')
}
