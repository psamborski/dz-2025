import { useCallback } from 'react'
import { useAxios } from "../AxiosProvider.jsx"

export const useAppData = () => {
  const axios = useAxios()

  const getAppData = useCallback(async () => {
    const query = `{
      plHero: homeCollection(limit: 1, locale: "pl") {
        items {
          websiteTitle
          homeText { json }
          cvTitle
          cvContent { json }
          cvFilesCollection {
            items {
              url
              title
              description
              contentType
            }
          }
        }
      }

      enHero: homeCollection(limit: 1, locale: "en") {
        items {
          websiteTitle
          homeText { json }
          cvTitle
          cvContent { json }
          cvFilesCollection {
            items {
              url
              title
              description
              contentType
            }
          }
        }
      }
      
      heroStatic: homeCollection(limit: 1) {
        items {
          homePhoto {
            url
            title
            description
            contentType
          }
        }
      }
      
      plBio: bioCollection(limit: 1, locale: "pl") {
        items {
          bioTitle
          achievementsTitle
          achievementsContent { json }
          choirsTitle
          choirsContent { json }
          compositionsTitle
          compositionsContent { json }
          bioPhoto {
            url
            title
            description
            contentType
          }
        }
      }

      enBio: bioCollection(limit: 1, locale: "en") {
        items {
          bioTitle
          achievementsTitle
          achievementsContent { json }
          choirsTitle
          choirsContent { json }
          compositionsTitle
          compositionsContent { json }
          bioPhoto {
            url
            title
            description
            contentType
          }
        }
      }
      
      bioStatic: bioCollection(limit: 1) {
        items {
          bioPhoto {
            url
            title
            description
            contentType
          }
        }
      }

      plContact: contactSectionCollection(limit: 1, locale: "pl") {
        items {
          contactTitle
          instagramTitle
          facebookTitle
        }
      }

      enContact: contactSectionCollection(limit: 1, locale: "en") {
        items {
          contactTitle
          instagramTitle
          facebookTitle
        }
      }

      contactStatic: contactSectionCollection(limit: 1) {
        items {
          phoneNumber
          emailAddress
          instagramLink
          facebookLink
          contactPhoto {
            url
            title
            description
            contentType
          }
        }
      }

      plMultimedia: multimediaCollection(limit: 1, locale: "pl") {
        items {
          multimediaTitle
          multimediaPhotosCollection {
            items {
              url
              title
              description
              contentType
            }
          }
          multimediaArchiveLink {
            url
            title
            description
            contentType
          }
          multimediaArchiveTitle
        }
      }

      enMultimedia: multimediaCollection(limit: 1, locale: "en") {
        items {
          multimediaTitle
          multimediaPhotosCollection {
            items {
              url
              title
              description
              contentType
            }
          }
          multimediaArchiveLink {
            url
            title
            description
            contentType
          }
          multimediaArchiveTitle
        }
      }
    }`

    return axios.post('', { query })
  }, [axios])

  return { getAppData }
}