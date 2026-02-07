import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import NotesFolder from './components/NotesFolder.jsx'
import ListOfFolders from './components/ListOfFolders.jsx'
import { useNotesData } from '../../../api/hooks/useNotesData.jsx'
import NotesSearchBar from './components/NotesSearchBar.jsx'
import { searchNotes } from './utils.js'
import SearchResults from './components/SearchResults.jsx'

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
  const [expandedGroupId, setExpandedGroupId] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { getNotesData } = useNotesData()
  const { title, loading: loadingText, error: errorText } =
  translations[language] || translations.en

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
          const categoryId = plCat.sys.id
          const enCat = enCategories.find(c => c.sys.id === categoryId)

          const subcats = plSubcats.filter(
            sc => sc.mainNotesCategory?.sys.id === categoryId
          )

          const groups = subcats.map(plSub => {
            const subId = plSub.sys.id
            const enSub = enSubcats.find(es => es.sys.id === subId)

            const groupPlNotes = plNotes.filter(
              note => note.notesSubcategory?.sys.id === subId
            )
            const groupEnNotes = enNotes.filter(
              note => note.notesSubcategory?.sys.id === subId
            )

            const notes = groupPlNotes.map(plNote => {
              const matchEnNote = groupEnNotes.find(
                enNote => enNote.sys.id === plNote.sys.id
              )

              return {
                id: plNote.sys.id,
                file: plNote.notesFile?.url,
                links: plNote.notesOptionalLinks,
                pl: {
                  name: plNote.notesTitle,
                  subtitle: plNote.notesSubtitle,
                  description: plNote.notesDesc || null
                },
                en: {
                  name: matchEnNote?.notesTitle || plNote.notesTitle,
                  subtitle: matchEnNote?.notesSubtitle || plNote.notesSubtitle,
                  description: matchEnNote?.notesDesc || null
                }
              }
            })

            return {
              id: subId,
              pl: plSub.subcategoryName,
              en: enSub?.subcategoryName || plSub.subcategoryName,
              notes
            }
          })

          return {
            id: categoryId,
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
    setExpandedGroupId(null)
    setSearchQuery('')
  }

  const handleNavigateToCategory = categoryId => {
    const category = data.find(cat => cat.id === categoryId)
    if (!category) return

    setSearchQuery('')
    setExpandedGroupId(null)
    setChosenFolder(category)
  }

  const handleNavigateToGroup = (categoryId, groupId) => {
    const category = data.find(cat => cat.id === categoryId)
    if (!category) return

    setSearchQuery('')
    setChosenFolder(category)
    setExpandedGroupId(groupId)
  }

  const hasSearch = searchQuery.trim().length > 0
  const searchResults = hasSearch
    ? searchNotes(data, searchQuery, language)
    : []

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

        {!chosenFolder && (
          <NotesSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              language === 'pl'
                ? 'Szukaj po tytule lub opisie...'
                : 'Search by title or description...'
            }
          />
        )}

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
              language={language}
              initialExpandedGroupId={expandedGroupId}
            />
          ) : hasSearch ? (
            <SearchResults
              results={searchResults}
              language={language}
              onNavigateCategory={handleNavigateToCategory}
              onNavigateGroup={handleNavigateToGroup}
            />
          ) : (
            <ListOfFolders
              folders={data}
              setFolder={setChosenFolder}
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