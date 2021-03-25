import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <b>User</b>
            </td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}

export default UserList