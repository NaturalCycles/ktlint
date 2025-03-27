import { SpawnOptions } from 'node:child_process'
import { runCommandSafe } from './exec.util.js'
import { ktlintPath } from './paths.js'

export async function ktlintAll(args: string[] = [], opt?: SpawnOptions): Promise<void> {
  await runCommandSafe(ktlintPath, ['-F', ...args], opt)
}
