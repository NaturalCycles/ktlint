import { join } from 'node:path'

export const projectDir = join(import.meta.dirname, '..')
export const resourcesDir = `${projectDir}/resources`
export const ktlintPath = `${resourcesDir}/ktlint`
