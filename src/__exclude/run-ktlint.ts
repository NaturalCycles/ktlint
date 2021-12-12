#!/usr/bin/env node

/*

yarn tsn ./src/bin/run-ktlint.ts --version

 */

import { runCommand } from '../exec.util'
import { ktlintPath } from '../paths'

// argv[0] is /usr/local/bin/node
// argv[1] is ./src/bin/run-ktlint.ts (when ran with `yarn tsn`)
const args = process.argv.slice(2)
// console.log({argv, argv0, args})

runCommand(ktlintPath, args)
