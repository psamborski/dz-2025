import { useCallback } from 'react'
import { useAxios } from '../AxiosProvider.jsx'

export const useNotesData = () => {
  const axios = useAxios()

  const getNotesData = useCallback(async () => {
    const query = `{
      plCategories: sheetCategoryCollection(locale: "pl") {
        items {
          categoryName
          sys { id }
        }
      }
      enCategories: sheetCategoryCollection(locale: "en") {
        items {
          categoryName
          sys { id }
        }
      }

      plSubcategories: sheetSubcategoryCollection(locale: "pl") {
        items {
          subcategoryName
          sys { id }
          mainNotesCategory {
            categoryName
            sys { id }
          }
        }
      }

      enSubcategories: sheetSubcategoryCollection(locale: "en") {
        items {
          subcategoryName
          sys { id }
          mainNotesCategory {
            categoryName
            sys { id }
          }
        }
      }

      plNotes: musicSheetCollection(locale: "pl", limit: 1000) {
        items {
          sys { id }
          notesTitle
          notesDesc { json }
          notesOptionalLink
          notesFile {
            url
            title
            description
            contentType
          }
          notesSubcategory {
            subcategoryName
            sys { id }
            mainNotesCategory {
              categoryName
              sys { id }
            }
          }
        }
      }

      enNotes: musicSheetCollection(locale: "en", limit: 1000) {
        items {
          sys { id }
          notesTitle
          notesDesc { json }
          notesOptionalLink
          notesFile {
            url
            title
            description
            contentType
          }
          notesSubcategory {
            subcategoryName
            sys { id }
            mainNotesCategory {
              categoryName
              sys { id }
            }
          }
        }
      }
    }`

    return axios.post('', { query })
  }, [axios])

  return { getNotesData }
}