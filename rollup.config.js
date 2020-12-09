import path from 'path'
import replace from 'rollup-plugin-replace'
import sourcemaps from 'rollup-plugin-sourcemaps'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import { uglify } from 'rollup-plugin-uglify'
import notify from 'rollup-plugin-notify'
import browsersync from 'rollup-plugin-browsersync'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const banner =
	`/*!
* Scheduler v${pkg.version}
* (c) 2020-${new Date().getFullYear()} tutustack
* Released under the MIT License.
*/`

const config = {}
const input = './src/index.js'
const output = []
const plugins = []

const name = 'Scheduler'
const freeze = false
const sourcemap = true

function filePath (fileName) {
	if (process.env.NODE_ENV == 'production') {
		return `dist/${fileName}`
	}

	return `public/dist/${fileName}`
}

// output.push({ format: 'iife', file: filePath('scheduler.iife.js'), freeze, name, sourcemap, banner })
// output.push({ format: 'es', file: filePath('scheduler.es.js'), freeze, name, sourcemap, banner })
// output.push({ format: 'esm', file: filePath('scheduler.esm.js'), freeze, name, sourcemap, banner })
// output.push({ format: 'amd', file: filePath('scheduler.amd.js'), freeze, name, sourcemap, banner })
output.push({ format: 'umd', file: filePath('scheduler.umd.js'), freeze, name, sourcemap, banner })
// output.push({ format: 'cjs', file: filePath('scheduler.cjs.js'), freeze, name, sourcemap, banner })

plugins.push(sourcemaps())
plugins.push(
	resolve({
		browser: true,
		preferBuiltins: false,
		jsnext: true
		// main: false
	})
)
plugins.push(alias({
	resolve: ['.js', '.json'],
	'@': path.resolve(__dirname, 'src')
}))

plugins.push(
	replace({
		__VERSION__: pkg.version
	})
)
plugins.push(babel({
	babelrc: true,
	exclude: 'node_modules/**'
}))
if (process.env.NODE_ENV != 'production') {
	plugins.push(
		browsersync({
			server: './public',
			port: '8082'
		})
	)
	plugins.push(notify())
} else {
	plugins.push(uglify())
	plugins.push(terser())
}

config.input = input
config.output = output
config.plugins = plugins

export default config
