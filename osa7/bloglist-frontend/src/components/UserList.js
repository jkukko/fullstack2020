import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UserList = () => {

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  })
  
  const users = useSelector(state => state.users)
  const classes = useStyles()

  if (!users) {
    return null
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
          <TableRow key={user.id}>
            <TableCell component="th" scope="row">
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell align="left">
              {user.blogs.length}
            </TableCell>
          </TableRow>  
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default UserList