import { SpawnOptions } from 'node:child_process'
import { runCommandSafe } from './exec.util'
import { ktlintPath } from './paths'

export async function ktlintAll(args: string[] = [], opt: SpawnOptions): Promise<void> {
  await runCommandSafe(ktlintPath, ['-F', ...args], opt)
}
