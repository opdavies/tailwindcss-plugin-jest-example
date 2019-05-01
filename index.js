module.exports = (variants) => ({ addUtilities }) => {
  addUtilities({
    '.test': {
      display: 'block'
    }
  }, variants)
}
