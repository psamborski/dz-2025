import React from 'react'
import PropTypes from 'prop-types'

const NotesSearchBar = ({value, onChange, placeholder}) => {
  return (
    <div className="notes-search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search music sheets"
      />
    </div>
  )
}

NotesSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default NotesSearchBar