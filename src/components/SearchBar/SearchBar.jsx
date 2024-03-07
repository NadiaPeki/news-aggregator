import React, { useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({searchText}) {
const [text, setText] = useState(' ')

    const handleSubmit = (e) => {
        e.preventDefault()
        searchText(text)
    }

  return (
      <div >
          <form className={styles.buttonWrapper} onSubmit={handleSubmit}>
              <input type='text'
                  placeholder='e.g.politics'
                  className={styles.inputSearch}
                  onChange={(e) => setText(e.target.value)}
              />
              <button type='submit' className={styles.buttonSearch}>Search</button>
          </form>
    </div>
  )
}



export default SearchBar