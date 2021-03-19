import Search from 'antd/lib/input/Search'
import React, { useState } from 'react'

function SearchFeature(props) {
  const [SearchTerms, setSearchTerms] = useState('')

  const onChangeSearch = event => {
    setSearchTerms(event.currentTarget.value)

    props.refreshFunction(event.currentTarget.value)
  }

  return (
    <div>
      <Search
        value={SearchTerms}
        onChange={onChangeSearch}
        placeholder='Search By Typing...'
      />
    </div>
  )
}

export default SearchFeature
