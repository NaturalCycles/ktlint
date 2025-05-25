import { spawn, type SpawnOptions } from 'node:child_process'

export function runCommand(command: string, args: string[] = [], opt: SpawnOptions = {}): void {
  console.log([command, ...args].join(' '))

  const p = spawn(command, [...args], {
    stdio: 'inherit',
    shell: true,
    ...opt,
  })

  p.on('close', code => {
    if (code) {
      console.log(`${command} exited with code ${code}`)
    }

    process.exit(code || 0)
  })
}

/**
 * Throws error on failure.
 */
export async function runCommandSafe(
  command: string,
  args: string[] = [],
  opt: SpawnOptions = {},
): Promise<void> {
  console.log([command, ...args].join(' '))

  return await new Promise((resolve, reject) => {
    const p = spawn(command, [...args], {
      stdio: 'inherit',
      shell: true,
      ...opt,
    })

    p.on('close', code => {
      if (!code) return resolve()

      reject(new Error(`${command} exited with code ${code}`))
    })
  })
}
