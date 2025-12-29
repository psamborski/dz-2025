import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

const NotesFolder = ({setFolder, chosenFolder, language}) => {
  const [expandedGroups, setExpandedGroups] = useState({})
  const contentRefs = useRef({})

  const toggleGroup = groupId => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const groups = chosenFolder?.groups ?? []

  return (
    <div>
      <span className="folders-back" onClick={() => setFolder(null)}>
        <span className="fas fa-chevron-left"/> {language === 'pl' ? 'wróć' : 'back'}
      </span>

      {groups.map(group => {
        const notesList = group?.notes ?? []
        const groupName = language === 'pl' ? (group?.pl || 'Grupa nut') : (group?.en || "Notes' group")
        const isExpanded = expandedGroups[group.id]

        if (!contentRefs.current[group.id]) {
          contentRefs.current[group.id] = React.createRef()
        }

        const ref = contentRefs.current[group.id]

        return (
          <div className="notes-group" key={group.id}>
            <h4
              className="notes-group-header"
              onClick={() => toggleGroup(group.id)}
              style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}
            >
              <span
                className={clsx(
                  'notes-group-header-icon',
                  'fas',
                  isExpanded ? 'fa-chevron-right rotated' : 'fa-chevron-right'
                )}
              />
              {groupName}
            </h4>

            <div
              ref={ref}
              className="notes-group-content"
              style={{
                maxHeight: isExpanded ? `${ref.current?.scrollHeight}px` : 0
              }}
            >
              {notesList.map(notes => {
                const noteContent = notes?.[language] ?? {}
                const name = noteContent.name ?? ''
                const description = noteContent.description?.json ?? null
                const fileLink = notes?.file || null
                const optionalLink = notes?.link || null

                return (
                  <div className="notes-box" key={notes.id}>
                    <div className="notes-desc-container">
                      <h5>{name}</h5>
                      {description && (
                        <div className="notes-description">
                          {documentToReactComponents(description)}
                        </div>
                      )}
                    </div>

                    <div className="notes-download-container">
                      {optionalLink && (
                        <a
                          href={optionalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="notes-external-link"
                          title={optionalLink}
                        >
                          <span className="fas fa-link"/>
                        </a>
                      )}

                      {fileLink && (
                        <a
                          href={fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="notes-file-download"
                          title={language === 'pl' ? 'Pobierz plik' : 'Download file'}
                        >
                          <span className="fas fa-file-download"/>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

NotesFolder.propTypes = {
  setFolder: PropTypes.func.isRequired,
  chosenFolder: PropTypes.shape({
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        pl: PropTypes.string,
        en: PropTypes.string,
        notes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            file: PropTypes.string,
            link: PropTypes.string,
            pl: PropTypes.shape({
              name: PropTypes.string,
              description: PropTypes.object
            }),
            en: PropTypes.shape({
              name: PropTypes.string,
              description: PropTypes.object
            })
          })
        )
      })
    )
  }),
  language: PropTypes.oneOf(['pl', 'en']).isRequired
}

export default NotesFolder