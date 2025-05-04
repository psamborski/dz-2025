import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import '../../styles/perfect-scrollbar.scss'

export default class ListOfFolders extends Component {
  render() {
    return (
      <div className='notes-folders-container'>
        {(this.props.folders || []).map(folder => {
          return folder?.groups && (
            <span
              className='notes-folder-item' key={'notes-folder-' + folder?.id || '0'}
              onClick={() => this.props.setFolder(folder)}
            >
              <h4>
                <span className='folder-icon'>
                  <span className='fas fa-folder' />
                  <span className='fas fa-music' />
                </span>
                {this.props.language === 'pl' ? folder?.pl || 'Folder nut' : folder?.en || 'Notes\' folder'}
              </h4>

            </span>
          )
        })}
      </div>
    )
  }
}

ListOfFolders.propTypes = {
  folders: PropTypes.array,
  setFolder: PropTypes.func,
  language: PropTypes.string
}
