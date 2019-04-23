const _ = require('lodash')
const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const disableCorePlugins = () => {
  return _.mapValues(defaultConfig.variants, () => false)
}

const generatePluginCss = (options = {}) => {
  return postcss(
    tailwindcss({
      corePlugins: disableCorePlugins(),
      plugins: [plugin(options)]
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
  .then(result => {
    return result.css
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the correct classes with no variants', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block
      }
    `)
  })
})

test('it generates the correct classes with variants', () => {
  return generatePluginCss({ variants: ['hover', 'focus'] }).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block
      }

      .hover\\:test:hover {
        display: block
      }

      .focus\\:test:focus {
        display: block
      }
    `)
  })
})
