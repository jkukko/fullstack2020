const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, b) => s + b.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}

