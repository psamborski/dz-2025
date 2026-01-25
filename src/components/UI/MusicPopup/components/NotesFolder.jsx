import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const NotesFolder = ({
                       setFolder,
                       chosenFolder,
                       language,
                       initialExpandedGroupId
                     }) => {
  const [expandedGroups, setExpandedGroups] = useState({})

  // Stores DOM nodes of group headers
  const headerRefs = useRef({})

  // Stores DOM nodes of group content containers
  const contentRefs = useRef({})

  /**
   * Expand the requested group when initialExpandedGroupId changes
   */
  useEffect(() => {
    if (!initialExpandedGroupId) return

    setExpandedGroups(prev => ({
      ...prev,
      [initialExpandedGroupId]: true
    }))
  }, [initialExpandedGroupId])

  /**
   * Scroll to the expanded group AFTER it is expanded
   */
  useEffect(() => {
    if (!initialExpandedGroupId) return
    if (!expandedGroups[initialExpandedGroupId]) return

    const headerEl = headerRefs.current[initialExpandedGroupId]
    if (!headerEl) return

    headerEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, [expandedGroups, initialExpandedGroupId])

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
        <span className="fas fa-chevron-left" />{' '}
        {language === 'pl' ? 'wróć' : 'back'}
      </span>

      {groups.map(group => {
        const notesList = group?.notes ?? []
        const groupName =
          language === 'pl'
            ? group?.pl || 'Grupa nut'
            : group?.en || "Notes' group"

        const isExpanded = !!expandedGroups[group.id]

        return (
          <div className="notes-group" key={group.id}>
            <h4
              ref={el => {
                if (el) headerRefs.current[group.id] = el
              }}
              className="notes-group-header"
              onClick={() => toggleGroup(group.id)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span
                className={clsx(
                  'notes-group-header-icon',
                  'fas',
                  isExpanded
                    ? 'fa-chevron-right rotated'
                    : 'fa-chevron-right'
                )}
              />
              {groupName}
            </h4>

            <div
              ref={el => {
                if (el) contentRefs.current[group.id] = el
              }}
              className="notes-group-content"
              style={{
                maxHeight: isExpanded
                  ? `${contentRefs.current[group.id]?.scrollHeight || 0}px`
                  : 0
              }}
            >
              {notesList.map(note => {
                const noteContent = note?.[language] ?? {}
                const name = noteContent.name ?? ''
                const description = noteContent.description?.json ?? null
                const fileLink = note?.file || null
                const optionalLink = note?.link || null

                return (
                  <div className="notes-box" key={note.id}>
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
                          <span className="fas fa-link" />
                        </a>
                      )}

                      {fileLink && (
                        <a
                          href={fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="notes-file-download"
                          title={
                            language === 'pl'
                              ? 'Pobierz plik'
                              : 'Download file'
                          }
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
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired,
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
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
  initialExpandedGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default NotesFolder