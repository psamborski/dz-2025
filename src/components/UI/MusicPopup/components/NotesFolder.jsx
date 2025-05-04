import React from 'react'
import PropTypes from 'prop-types'

const NotesFolder = ({ setFolder, chosenFolder, language }) => {
  const groups = chosenFolder?.groups ?? []

  return (
      <div>
      <span
          className='folders-back'
          onClick={() => setFolder(null)}
      >
        <span className='fas fa-chevron-left' /> {language === 'pl' ? 'wróć' : 'back'}
      </span>

        {groups.map(group => {
          const notesList = group?.notes ?? []
          const groupName = language === 'pl' ? (group?.pl || 'Grupa nut') : (group?.en || "Notes' group")

          return (
              <div className='notes-group' key={group?.id ?? 'notes-group-0'}>
                <h4>{groupName}</h4>

                {notesList.map(notes => {
                  const noteContent = notes?.[language] ?? {}
                  const name = noteContent.name ?? ''
                  const description = noteContent.description ?? ''
                  const fileLink = notes?.file ?? '#'

                  return (
                      <div className='notes-box' key={notes?.id ?? 'notes-0'}>
                        <div className='notes-desc-container'>
                          <h5>{name}</h5>
                          <p>{description}</p>
                        </div>

                        <div className='notes-download-container'>
                          <a href={fileLink} rel='noopener noreferrer' target='_blank'>
                            <span className='fas fa-file-download' />
                          </a>
                        </div>
                      </div>
                  )
                })}
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
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          pl: PropTypes.string,
          en: PropTypes.string,
          notes: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                file: PropTypes.string,
                pl: PropTypes.shape({
                  name: PropTypes.string,
                  description: PropTypes.string
                }),
                en: PropTypes.shape({
                  name: PropTypes.string,
                  description: PropTypes.string
                })
              })
          )
        })
    )
  }),
  language: PropTypes.oneOf(['pl', 'en']).isRequired
}

export default NotesFolder