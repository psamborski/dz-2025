import React from 'react'
import PropTypes from 'prop-types'

const ListOfFolders = ({ folders = [], setFolder, language }) => {
  return (
      <div className='notes-folders-container'>
        {folders.map(folder => {
          const folderName = language === 'pl' ? (folder?.pl || 'Folder nut') : (folder?.en || "Notes' folder")

          return folder?.groups ? (
              <span
                  className='notes-folder-item'
                  key={`notes-folder-${folder?.id ?? '0'}`}
                  onClick={() => setFolder(folder)}
              >
            <h4>
              <span className='folder-icon'>
                <span className='fas fa-folder' />
                <span className='fas fa-music' />
              </span>
              {folderName}
            </h4>
          </span>
          ) : null
        })}
      </div>
  )
}

ListOfFolders.propTypes = {
  folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        pl: PropTypes.string,
        en: PropTypes.string,
        groups: PropTypes.array
      })
  ).isRequired,
  setFolder: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired
}

export default ListOfFolders