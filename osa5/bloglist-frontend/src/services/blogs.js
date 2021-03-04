import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { authorization: token }
  }

  console.log(newBlog)

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: { authorization: token }
  }

  const url = baseUrl + '/' + id

  const response = await axios.put(url, blogObject, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { authorization: token }
  }

  const url = baseUrl + "/" + id
  console.log(url)
  const response = await axios.delete(url, config)

  return response.data
}

export default { getAll, setToken, create, update, remove }