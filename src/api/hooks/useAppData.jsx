import {useCallback} from 'react'
import {useAxios} from "../AxiosProvider.jsx";

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

      plBio: bioCollection(limit: 1, locale: "pl") {
        items {
          bioTitle
          achievementsTitle
          achievementsContent { json }
          choirsTitle
          choirsContent { json }
          composistionsTitle
          composistionsContent { json }
        }
      }

      enBio: bioCollection(limit: 1, locale: "en") {
        items {
          bioTitle
          achievementsTitle
          achievementsContent { json }
          choirsTitle
          choirsContent { json }
          composistionsTitle
          composistionsContent { json }
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
        }
      }
    }
    `

    return axios.post('', {query})
  }, [axios])

  return {getAppData: getAppData}
}