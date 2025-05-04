import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import clsx from 'clsx'
import NotesFolder from './components/NotesFolder.jsx'
import ListOfFolders from './components/ListOfFolders.jsx'

const translations = {
  pl: {
    title: 'Opracowania',
    loading: 'Wczytywanie...',
    error: 'Błąd ładowania danych'
  },
  en: {
    title: 'Compositions',
    loading: 'Loading...',
    error: 'Error loading data'
  }
}

const MusicPopup = ({ isShowMusicPopupShown, hideMusicPopup, language }) => {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState(null)
  const [chosenFolder, setChosenFolder] = useState(null)
  const [error, setError] = useState(false)

  const { title, loading: loadingText, error: errorText } = translations[language] || translations.en

  useEffect(() => {
    if (isShowMusicPopupShown) {
      getNotes()
    }
  }, [isShowMusicPopupShown])

  const getNotes = () => {
    setLoading(true)
    setError(false)

    axios.get('http://cms.dariuszzimnicki.com/getNotes', {
      headers: {
        Authorization: '$2y$12$u/OLECVbrHmop.a2uup5/.Fc4sPHSOgJlLz0NlE19z7s.UxSbsmWK'
      }
    })
        .then(response => {
          setNotes(response.data)
          setLoading(false)
        })
        .catch(() => {
          setNotes(null)
          setLoading(false)
          setError(true)
        })
  }

  const handleHidePopup = () => {
    hideMusicPopup()
    setChosenFolder(null)
  }

  return (
      <section
          id='music-popup'
          className={clsx({ 'popup-hidden': !isShowMusicPopupShown })}
          onClick={event => {
            if (event.target.id === 'music-popup') {
              handleHidePopup()
            }
          }}
      >
        <div className='popup-container'>
          <div className='close-popup' onClick={handleHidePopup}>
            <span className='fas fa-times' />
          </div>

          <h3>
            {chosenFolder ? chosenFolder?.[language] : title}
          </h3>

          <div className='popup-content'>
            {loading ? (
                <div className='popup-loader'>
                  <span>{loadingText}</span>
                </div>
            ) : error ? (
                <div className='popup-error'>
                  <span>{errorText}</span>
                </div>
            ) : chosenFolder ? (
                <NotesFolder
                    setFolder={setChosenFolder}
                    chosenFolder={chosenFolder}
                    isShowMusicPopupShown={isShowMusicPopupShown}
                    hideMusicPopup={hideMusicPopup}
                    language={language}
                />
            ) : (
                <ListOfFolders
                    folders={notes}
                    setFolder={setChosenFolder}
                    isShowMusicPopupShown={isShowMusicPopupShown}
                    hideMusicPopup={hideMusicPopup}
                    language={language}
                />
            )}
          </div>
        </div>
      </section>
  )
}

MusicPopup.propTypes = {
  isShowMusicPopupShown: PropTypes.bool.isRequired,
  hideMusicPopup: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired
}

export default MusicPopup