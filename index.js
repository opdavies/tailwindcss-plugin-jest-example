module.exports = (variants) => {
  return function ({ addUtilities }) {
    addUtilities({
      '.test': {
        display: 'block'
      }
    }, variants)
  }
}
