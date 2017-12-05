function hasRepeated (arr) {
  return new Set(arr).size !== arr.length
}

module.exports = hasRepeated
