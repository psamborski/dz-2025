import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import NotesFolder from './components/NotesFolder'
import ListOfFolders from './components/ListOfFolders'
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import '../../styles/perfect-scrollbar.scss'

export default class MusicPopup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      notes: null,
      chosenFolder: null
    }
  }

  componentDidMount() {
    if (this.props.isShowMusicPopupShown) {
      this.getNotes()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isShowMusicPopupShown && !prevProps.isShowMusicPopupShown) {
      this.getNotes()
    }
  }

  getNotes = () => {
    axios.defaults.headers.common.Authorization = '$2y$12$u/OLECVbrHmop.a2uup5/.Fc4sPHSOgJlLz0NlE19z7s.UxSbsmWK'

    axios.get('http://cms.dariuszzimnicki.com/getNotes')
      .then(response => {
        this.setState({ notes: response.data, loading: false })
        // console.log('Translations loading time: ', (Date.now() - this.transTimerStart) / 1000)
      })
      .catch((error) => {
        this.setState({ notes: null, loading: false })
        console.log(error)
      })
  }

  setFolder = (folder) => {
    this.setState({ chosenFolder: folder })
  }

  hideMusicPopup = () => {
    this.props.hideMusicPopup()
    this.setFolder(null)
  }

  render() {
    return (
      <section
        id='music-popup'
        className={this.props.isShowMusicPopupShown ? '' : 'popup-hidden'}
        onClick={event => {
          if (event.target.id === 'music-popup') {
            this.hideMusicPopup()
          }
        }}
      >
        <div
          className='popup-container'
        >
          <div
            className='close-popup'
            onClick={() => this.hideMusicPopup()}
          >
            <span className='fas fa-times' />
          </div>

          <h3>
            {
              this.state.chosenFolder
                ? (
                  <span>
                    {this.state.chosenFolder?.[this.props.language]}
                  </span>
                )
                : this.props.language === 'pl' ? 'Opracowania' : 'Compositions'
            }
          </h3>

          {/* <PerfectScrollbar> */}
          <div className='popup-content'>
            {
              this.state.loading
                ? (
                  <div className='popup-loader'>
                    <span>{this.props.language === 'pl' ? 'Wczytywanie...' : 'Loading...'}</span>
                  </div>
                )
                : this.state.chosenFolder
                  ? (
                    <NotesFolder
                      setFolder={this.setFolder}
                      chosenFolder={this.state.chosenFolder}
                      {...this.props}
                    />
                  )
                  : (
                    <ListOfFolders
                      folders={this.state.notes}
                      setFolder={this.setFolder}
                      {...this.props}
                    />
                  )
            }
          </div>
          {/* </PerfectScrollbar> */}
        </div>
      </section>
    )
  }
}

MusicPopup.propTypes = {
  isShowMusicPopupShown: PropTypes.bool,
  hideMusicPopup: PropTypes.func,
  language: PropTypes.string
}
