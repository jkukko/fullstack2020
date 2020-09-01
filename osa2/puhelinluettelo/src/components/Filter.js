import React from 'react'

const Filter = (props) => {
    return(
      <form>
        <div>
          filter show with <input value={props.filterValue} onChange={props.filterOnChange}/>
        </div>
      </form>
    )
}


export default Filter