import React from 'react'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const SearchResults = ({ results, language, onNavigateCategory, onNavigateGroup }) => {
  if (!results.length) return null

  return (
    <div className="notes-group is-search-results">
      <div className="notes-group-content">
        {results.map(({ note, category, group }) => {
          const content = note[language] || {}

          return (
            <div className="notes-box" key={note.id}>
              <div className="notes-desc-container">
                <h5>{content.name}</h5>

                {content.description?.json && (
                  <div className="notes-description">
                    {documentToReactComponents(content.description.json)}
                  </div>
                )}

                <div className="notes-search-path">
                  <small>
                    {category.id && <span
                      className="notes-search-link"
                      role="link"
                      tabIndex={0}
                      onClick={() => onNavigateCategory(category.id)}
                    >
                      {category.name}
                    </span>}

                    {category.id && group.id && <>
                      {' / '}

                      <span
                        className="notes-search-link"
                        role="link"
                        tabIndex={0}
                        onClick={() =>
                          onNavigateGroup(category.id, group.id)
                        }
                      >
                        {group.name}
                      </span>
                    </>
                    }
                  </small>
                </div>
              </div>

              <div className="notes-download-container">
                {note.link && (
                  <a
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fas fa-link" />
                  </a>
                )}

                {note.file && (
                  <a
                    href={note.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="fas fa-file-download" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
  onNavigateCategory: PropTypes.func.isRequired,
  onNavigateGroup: PropTypes.func.isRequired
}

export default SearchResults