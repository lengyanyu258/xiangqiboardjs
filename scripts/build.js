// -----------------------------------------------------------------------------
// This file builds the xiangqiboard files in the dist/ releases/ docs/ folders
// -----------------------------------------------------------------------------

// libraries
const fs = require('fs-plus')
const Terser = require('terser')
const csso = require('csso')
const path = require('path')

const encoding = { encoding: 'utf8' }

// files
const latestChessboardJS = fs.readFileSync(path.join('src', 'xiangqiboard.js'), encoding)
const latestChessboardCSS = fs.readFileSync(path.join('src', 'xiangqiboard.css'), encoding)

const packageJSON = JSON.parse(fs.readFileSync('package.json', encoding))
const packageFiles = ['CHANGELOG.md', 'LICENSE.md', 'package.json', 'README.md']
const packageImgDirs = [path.join('xiangqiboards', 'wikimedia'),
  path.join('xiangqipieces', 'graphic'), path.join('xiangqipieces', 'traditional'),
  path.join('xiangqipieces', 'wikimedia'), path.join('xiangqipieces', 'wikipedia')]

const VERSION = packageJSON.version
const DATE = new Date().toLocaleDateString()

function renderJS (js) {
  return (js + '')
    .replace(/@VERSION/g, VERSION)
    // remove RUN_ASSERTS
    .replace(/\s*console.assert.+/g, '')
    .replace(/\s*if\W+RUN_ASSERTS[^}]+}/g, '') // if (RUN_ASSERTS) {}
    .replace(/\s*\w*\W*RUN_ASSERTS.+/g, '') // const RUN_ASSERTS = true
}

function renderCSS (css) {
  return (css + '')
    .replace(/\$version\$/g, VERSION)
    .replace(/\$date\$/g, DATE)
}

function syncImgDirs (targetTopPath) {
  packageImgDirs.forEach(dir => {
    const fromDirPath = path.join('docs', 'img', dir)
    const toDirPath = path.join(targetTopPath, 'img', dir)
    fs.readdirSync(fromDirPath).forEach(file => {
      fs.writeFileSync(path.join(toDirPath, file), fs.readFileSync(path.join(fromDirPath, file), encoding), encoding)
    })
  })
}

function deleteDir (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(each => {
      const curPath = path.join(dirPath, each)
      if (fs.statSync(curPath).isFile()) fs.unlinkSync(curPath)
      else deleteDir(curPath)
    })
    fs.rmdirSync(dirPath)
  }
}

function writeSrcFiles () {
  const releasePath = path.join('releases', 'xiangqiboardjs-' + VERSION)
  const jsReleasePath = path.join(releasePath, 'js', 'xiangqiboard-' + VERSION + '.js')
  const jsReleaseMinPath = jsReleasePath.replace(/js$/, 'min.js')
  const cssReleasePath = path.join(releasePath, 'css', 'xiangqiboard-' + VERSION + '.css')
  const cssReleaseMinPath = cssReleasePath.replace(/css$/, 'min.css')

  const jsInput = renderJS(latestChessboardJS)
  const cssInput = renderCSS(latestChessboardCSS)

  // sync to release
  syncImgDirs(releasePath)
  packageFiles.forEach(file => {
    fs.writeFileSync(path.join(releasePath, file), fs.readFileSync(file, encoding), encoding)
  })
  // .js, .css
  fs.writeFileSync(jsReleasePath, jsInput, encoding)
  fs.writeFileSync(cssReleasePath, cssInput, encoding)
  // .min.js, .min.css
  fs.writeFileSync(jsReleaseMinPath, Terser.minify(jsInput).code, encoding)
  fs.writeFileSync(cssReleaseMinPath, csso.minify(cssInput).css, encoding)

  // sync to dist
  deleteDir('dist')
  syncImgDirs('dist')
  Array(jsReleasePath, jsReleaseMinPath, cssReleasePath, cssReleaseMinPath).forEach(file => {
    fs.writeFileSync(path.join('dist', path.basename(file)), fs.readFileSync(file, encoding), encoding)
  })

  // sync to website
  fs.writeFileSync(path.join('docs', 'js', 'xiangqiboard.min.js'), fs.readFileSync(jsReleaseMinPath, encoding), encoding)
  fs.writeFileSync(path.join('docs', 'css', 'xiangqiboard.min.css'), fs.readFileSync(cssReleaseMinPath, encoding), encoding)
}

writeSrcFiles()
