/* eslint-disable no-console */
import { readdir } from 'fs/promises'
import path from 'path'
import { pathToFileURL } from 'url'

const SEEDS_DIR = path.join(__dirname, 'seeds')

// Type definition for seed modules
interface SeedModule {
  default?: () => Promise<void> | void
  seed?: () => Promise<void> | void
}

async function seedFile(fileName: string) {
  const fullPath = path.join(SEEDS_DIR, fileName)
  const seedModule = (await import(pathToFileURL(fullPath).href)) as SeedModule

  if (typeof seedModule.default === 'function') {
    console.log(`🔄 Running seed: ${fileName}`)
    await seedModule.default()
    console.log(`✅ Seed completed: ${fileName}`)
  } else if (typeof seedModule.seed === 'function') {
    console.log(`🔄 Running seed: ${fileName}`)
    await seedModule.seed()
    console.log(`✅ Seed completed: ${fileName}`)
  } else {
    console.warn(`⚠️ Skipped ${fileName} — no default or seed() exported`)
  }
}

async function main() {
  const target = process.argv[2]
  const files = await readdir(SEEDS_DIR)
  const seedFiles = files.filter(
    (file) =>
      file.endsWith('.ts') && !file.startsWith('.') && !file.endsWith('.d.ts'),
  )

  console.log(`🔍 Found ${seedFiles.length} seed files in 'seeds/' folder.`)
  if (target) {
    const fileName = `${target}.ts`
    if (!seedFiles.includes(fileName)) {
      console.error(`❌ Seed file '${fileName}' not found in 'seeds/' folder.`)
      process.exit(1)
    }
    await seedFile(fileName)
  } else {
    for (const file of seedFiles) {
      await seedFile(file)
    }
  }

  console.log('✅ All seeding done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
/* eslint-enable no-console */
