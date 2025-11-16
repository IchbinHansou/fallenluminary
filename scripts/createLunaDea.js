const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const sharp = require('sharp')
const { path: ffmpegPath } = require('@ffmpeg-installer/ffmpeg')

const galleryDir = path.join(__dirname, '../public/images/Gallery')
const tempDir = path.join(galleryDir, '__temp_frames')
const listFile = path.join(galleryDir, 'luna_frames.txt')
const outputFile = path.join(galleryDir, 'LunaDea.webp')

const frames = [
  { file: '2.jpg', duration: 2 },
  { file: '2.png', duration: 2 },
]

async function prepareFrames() {
  await fs.promises.mkdir(tempDir, { recursive: true })

  const prepared = await Promise.all(frames.map(async (frame, index) => {
    const sourcePath = path.join(galleryDir, frame.file)
    const convertedPath = path.join(tempDir, `frame-${index}.png`)
    await sharp(sourcePath).png().toFile(convertedPath)
    return {
      file: convertedPath,
      duration: frame.duration,
    }
  }))

  const concatContent =
    prepared
      .map(({ file, duration }) => `file '${file.replace(/\\/g, '/')}'\nduration ${duration}`)
      .join('\n') + `\nfile '${prepared[prepared.length - 1].file.replace(/\\/g, '/')}'\n`

  await fs.promises.writeFile(listFile, concatContent, 'utf8')
  return prepared
}

async function cleanup() {
  await fs.promises.rm(listFile, { force: true })
  await fs.promises.rm(tempDir, { recursive: true, force: true })
}

async function main() {
  await prepareFrames()

  const result = spawnSync(
    ffmpegPath,
    [
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      listFile,
      '-loop',
      '0',
      '-vsync',
      '0',
      outputFile,
    ],
    { stdio: 'inherit' }
  )

  await cleanup()

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  console.log('Created', outputFile)
}

main().catch(async (error) => {
  console.error(error)
  await cleanup()
  process.exit(1)
})