#!/usr/bin/env node

/*

yarn tsn ./src/bin/run-ktlint.ts --version

 */

import { spawn } from 'child_process'
import { ktlintPath } from '../paths'

// argv[0] is /usr/local/bin/node
// argv[1] is ./src/bin/run-ktlint.ts (when ran with `yarn tsn`)
const args = process.argv.slice(2)
// console.log({argv, argv0, args})

console.log(['ktlint', ...args].join(' '))

const p = spawn(ktlintPath, [...args], {
  stdio: 'inherit',
  shell: true,
  // env : { FORCE_COLOR: 'true' }
})

// out.on('error', (error) => {
//   console.log(`error: ${error.message}`);
// });

p.on('close', code => {
  // console.log(`child process exited with code ${code}`);
  process.exit(code || 0)
})
