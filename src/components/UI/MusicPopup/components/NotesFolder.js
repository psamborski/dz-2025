import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NotesFolder extends Component {
  render() {
    return <div>
      <span
        className='folders-back'
        onClick={() => this.props.setFolder(null)}
      >
        <span className='fas fa-chevron-left' /> {this.props.language === 'pl' ? 'wróć' : 'back'}
      </span>
      {(this.props.chosenFolder?.groups || []).map(group => {
        return (
          <div className='notes-group' key={'notes-group-' + group?.id || '0'}>
            <h4>{this.props.language === 'pl' ? group?.pl || 'Grupa nut' : group?.en || 'Notes\' group'}</h4>
            {
              (group?.notes || []).map(notes => {
                return (
                  <div className='notes-box' key={'notes-' + notes?.id || '0'}>
                    <div className='notes-desc-container'>
                      <h5>{notes?.[this.props.language]?.name}</h5>
                      <p>{notes?.[this.props.language]?.description}</p>
                    </div>
                    <div className='notes-download-container'>
                      <a href={notes?.file} rel='noopener noreferrer' target='_blank'>
                        <span className='fas fa-file-download' />
                      </a>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
      )}
    </div>
  }
}

NotesFolder.propTypes = {
  setFolder: PropTypes.func,
  chosenFolder: PropTypes.object,
  language: PropTypes.string
}
