const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((s, b) => s + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((max, b) => max && max.likes > b.likes ? max : b, null)
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

