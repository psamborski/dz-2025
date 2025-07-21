import { useCallback } from 'react'
import { useAxios } from '../AxiosProvider.jsx'

export const useNotesData = () => {
  const axios = useAxios()

  const getNotesData = useCallback(async () => {
    const query = `{
      plCategories: sheetCategoryCollection(locale: "pl") {
        items {
          categoryName
          slug
        }
      }
      enCategories: sheetCategoryCollection(locale: "en") {
        items {
          categoryName
          slug
        }
      }

      plSubcategories: sheetSubcategoryCollection(locale: "pl") {
        items {
          subcategoryName
          slug
          mainNotesCategory {
            categoryName
            slug
          }
        }
      }

      enSubcategories: sheetSubcategoryCollection(locale: "en") {
        items {
          subcategoryName
          slug
          mainNotesCategory {
            categoryName
            slug
          }
        }
      }

      plNotes: musicSheetCollection(locale: "pl") {
        items {
          notesTitle
          notesDescription
          notesFile {
            url
            title
            description
            contentType
          }
          notesSubcategory {
            subcategoryName
            slug
            mainNotesCategory {
              categoryName
              slug
            }
          }
        }
      }

      enNotes: musicSheetCollection(locale: "en") {
        items {
          notesTitle
          notesDescription
          notesFile {
            url
            title
            description
            contentType
          }
          notesSubcategory {
            subcategoryName
            slug
            mainNotesCategory {
              categoryName
              slug
            }
          }
        }
      }
    }`

    return axios.post('', { query })
  }, [axios])

  return { getNotesData }
}