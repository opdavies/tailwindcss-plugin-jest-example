const _ = require('lodash')
const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index.js')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const disableCorePlugins = () => {
  return _.mapValues(defaultConfig.variants, plugin => {
    return false
  })
}

const generatePluginCss = () => {
  return postcss(
    tailwindcss({
      corePlugins: disableCorePlugins(),
      plugins: [plugin()]
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

test('it generates classes', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .test {
        display: block;
      }
    `)
  })
})
