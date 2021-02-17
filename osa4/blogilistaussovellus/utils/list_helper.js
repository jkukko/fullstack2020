const lodash = require('lodash')

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

const mostBlogs = (blogs) => {

  if (blogs.length === 0 ) {
    return null
  }
  const count = lodash.countBy(blogs.map(b => b.author))
  return (
    lodash.orderBy(lodash.map(count, (v, k) => ({ author: k, blogs: v })), ['blogs'], ['desc'])[0]
  )
}

const monstLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const listOfAutorAndLikes = blogs.map(blog => ({ name: blog.author, likes: blog.likes }))
  
  const combinedList = {}
  
  listOfAutorAndLikes.forEach(author => {
    if (combinedList[author.name]) {
      combinedList[author.name] += author.likes
    } else {
      combinedList[author.name] = author.likes
    }
  })

  const topAuthor = Object.keys(combinedList).reduce((max, next) => {
    return combinedList[max] >= combinedList[next] ? max : next
  })
  
  return { author: topAuthor, likes: combinedList[topAuthor] }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  monstLikes
}

