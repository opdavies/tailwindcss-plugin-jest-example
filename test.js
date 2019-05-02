const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

function generatePluginCss(options = {}) {
  return postcss(
    tailwindcss({
      corePlugins: false,
      plugins: [plugin(options)]
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the correct classes with no variants', () => {
  const output = `
    .test {
      display: block
    }
  `

  generatePluginCss().then(result => {
    expect(result.css).toMatchCss(output)
  })
})

test('it generates the correct classes with variants', () => {
  const output = `
    .test {
      display: block
    }

    .hover\\:test:hover {
      display: block
    }

    .focus\\:test:focus {
      display: block
    }
  `

  generatePluginCss({ variants: ['hover', 'focus'] }).then(result => {
    expect(result.css).toMatchCss(output)
  })
})
