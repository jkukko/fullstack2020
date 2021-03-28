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

const BlogList = () => {

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blog)

  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blog Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <TableRow key={blog.title}>
            <TableCell component="th" scope="row">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </TableCell>
            <TableCell align="left">
              {blog.author}
            </TableCell>
            <TableCell align="left">
              {blog.likes}
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default BlogList