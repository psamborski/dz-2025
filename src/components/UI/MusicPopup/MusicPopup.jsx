import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import NotesFolder from './components/NotesFolder.jsx'
import ListOfFolders from './components/ListOfFolders.jsx'
import { useNotesData } from '../../../api/hooks/useNotesData.jsx'

const translations = {
  pl: {
    title: 'Nuty',
    loading: 'Wczytywanie...',
    error: 'Błąd ładowania danych'
  },
  en: {
    title: 'Music sheets',
    loading: 'Loading...',
    error: 'Error loading data'
  }
}

const MusicPopup = ({ isShowMusicPopupShown, hideMusicPopup, language }) => {
  const [chosenFolder, setChosenFolder] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { getNotesData } = useNotesData()
  const { title, loading: loadingText, error: errorText } = translations[language] || translations.en

  useEffect(() => {
    if (!isShowMusicPopupShown) return

    setLoading(true)
    setError(false)

    getNotesData()
      .then(res => {
        const plCategories = res.data?.data?.plCategories?.items || []
        const enCategories = res.data?.data?.enCategories?.items || []
        const plSubcats = res.data?.data?.plSubcategories?.items || []
        const enSubcats = res.data?.data?.enSubcategories?.items || []
        const plNotes = res.data?.data?.plNotes?.items || []
        const enNotes = res.data?.data?.enNotes?.items || []

        const categories = plCategories.map(plCat => {
          const slug = plCat.slug
          const enCat = enCategories.find(c => c.slug === slug)

          const subcats = plSubcats.filter(sc => sc.mainNotesCategory?.slug === slug)

          const groups = subcats.map(plSub => {
            const subSlug = plSub.slug
            const enSub = enSubcats.find(es => es.slug === subSlug)

            const groupPlNotes = plNotes.filter(note => note.notesSubcategory?.slug === subSlug)
            const groupEnNotes = enNotes.filter(note => note.notesSubcategory?.slug === subSlug)

            const notes = groupPlNotes.map(plNote => {
              const matchEnNote = groupEnNotes.find(enNote =>
                enNote.sys.id === plNote.sys.id
              )

              return {
                id: plNote.notesFile?.url,
                file: plNote.notesFile?.url,
                link: plNote.notesOptionalLink,
                pl: {
                  name: plNote.notesTitle,
                  description: plNote.notesDesc || null
                },
                en: {
                  name: matchEnNote?.notesTitle || plNote.notesTitle,
                  description: matchEnNote?.notesDesc || null
                }
              }
            })

            return {
              id: subSlug,
              pl: plSub.subcategoryName,
              en: enSub?.subcategoryName || plSub.subcategoryName,
              notes
            }
          })

          return {
            id: slug,
            pl: plCat.categoryName,
            en: enCat?.categoryName || plCat.categoryName,
            groups
          }
        })

        setData(categories)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
      })
  }, [isShowMusicPopupShown, getNotesData])

  const handleHidePopup = () => {
    hideMusicPopup()
    setChosenFolder(null)
  }

  return (
    <section
      id="music-popup"
      className={clsx({ 'popup-hidden': !isShowMusicPopupShown })}
      onClick={event => {
        if (event.target.id === 'music-popup') handleHidePopup()
      }}
    >
      <div className="popup-container">
        <div className="close-popup" onClick={handleHidePopup}>
          <span className="fas fa-times" />
        </div>

        <h3>{chosenFolder ? chosenFolder?.[language] : title}</h3>

        <div className="popup-content">
          {loading ? (
            <div className="popup-loader">
              <span>{loadingText}</span>
            </div>
          ) : error ? (
            <div className="popup-error">
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
              folders={data}
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