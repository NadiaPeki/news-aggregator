import React, { useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar() {
const [text, setText] = useState(' ')

    const handleSubmit = (event) => {
        event.preventDefault()
    }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type='text'
                  placeholder='e.g.politics'
                  className={styles.inputSearch}
                  onChange={(event) => setText(text)}
              />
              <button type='submit' className={styles.buttonSearch}>Search</button>
          </form>
    </div>
  )
}







export default SearchBar