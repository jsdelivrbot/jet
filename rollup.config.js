import stripCode from 'rollup-plugin-strip-code'
import replace from 'rollup-plugin-replace'
import pkg from './package.json'
import { install } from 'source-map-support'

install()

const outdir = './test/lib'
const BROWSERONLY = {
  start_comment: 'node-only',
  end_comment: 'end-node-only'
}

const NGN = './node_modules/ngn/src/main.js'
const JET = './src/main.js'

// JET Development: Standard (Unminified ES6)
export default [{
  input: NGN,
  plugins: [
    stripCode(BROWSERONLY),
    replace({
      delimiters: ['[#', '#]'],
      REPLACE_VERSION: require('./node_modules/ngn/package.json').version
    })
  ],
  output: [
    { file: `${outdir}/ngn.js`, format: 'cjs', sourcemap: true }
  ]
},{
  input: JET,
  plugins: [
    stripCode(BROWSERONLY),
    replace({
      delimiters: ['[#', '#]'],
      REPLACE_VERSION: pkg.version
    })
  ],
  output: [
    { file: `${outdir}/jet.js`, format: 'cjs', sourcemap: true }
  ]
}]
