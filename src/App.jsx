import {useEffect, useState} from 'react'
import {ParallaxProvider} from 'react-scroll-parallax'
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom'

import ParallaxRefresh from './components/Helpers/ParallaxRefresh'

import './styles/App.scss'
import './components/UI/UI.scss'
import './components/UX/UX.scss'
import './styles/perfect-scrollbar.scss'

import translationsFallback from './assets/files/translations.json'

import Menu from './components/UI/Menu.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Multimedia from './components/Multimedia.jsx'
import Contact from './components/Contact.jsx'
import Error404 from './components/UI/404.jsx'
import Loader from './components/UX/Loader.jsx'
import MusicPopup from './components/UI/MusicPopup/MusicPopup.jsx'
import BioPopup from './components/UI/BioPopup.jsx'
import {AxiosProvider} from "./api/AxiosProvider.jsx"
import {ErrorBoundary} from "./components/Helpers/ErrorBoundary.jsx";

const usePathname = () => {
  const location = useLocation()
  return location.pathname
}

const AppContent = ({translations, language, showBioPopup}) => (
  <>
    <Home translations={translations} language={language} showBioPopup={showBioPopup}/>
    <About translations={translations} language={language}/>
    <Multimedia translations={translations} language={language}/>
    <Contact translations={translations} language={language}/>
  </>
)

const App = () => {
  const pathname = usePathname()
  console.log(pathname)

  const [loading, setLoading] = useState(true)
  const [timeoutLoading, setTimeoutLoading] = useState(true)
  const [translations, setTranslations] = useState({pl: {}, en: {}})
  const [language, setLanguage] = useState('pl')
  const [isMusicPopupShown, setMusicPopupShown] = useState(pathname.endsWith('nuty'))
  const [isBioPopupShown, setBioPopupShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutLoading(false), 2500)

    const fetchTranslations = async () => {
      try {
        const response = await axios.get('http://cms.dariuszzimnicki.com/getTranslations', {
          headers: {
            Authorization: '$2y$12$u/OLECVbrHmop.a2uup5/.Fc4sPHSOgJlLz0NlE19z7s.UxSbsmWK'
          }
        })
        setTranslations(response.data)
      } catch (error) {
        console.error(error)
        setTranslations(translationsFallback)
      } finally {
        setLoading(false)
      }
    }

    fetchTranslations()

    return () => clearTimeout(timer)
  }, [])

  const changeLanguage = () => {
    setLanguage((prev) => (prev === 'pl' ? 'en' : 'pl'))
  }

  return (
    <ParallaxProvider>
      <ParallaxRefresh/>

      <Menu
        pathname={pathname}
        language={language}
        changeLanguage={changeLanguage}
        toggleMusicPopup={() => setMusicPopupShown(!isMusicPopupShown)}
      />

      <Loader show={loading || timeoutLoading}/>

      <ErrorBoundary>
        translations={translations}
        language={language}
        showBioPopup={() => setBioPopupShown(true)}
      />
      </ErrorBoundary>

      <MusicPopup
        isShowMusicPopupShown={isMusicPopupShown}
        hideMusicPopup={() => setMusicPopupShown(false)}
        language={language}
      />

      <BioPopup
        isBioPopupShown={isBioPopupShown}
        hideBioPopup={() => setBioPopupShown(false)}
        language={language}
        translations={translations}
      />
    </ParallaxProvider>
  )
}

const AppWrapper = () => (
  <ParallaxProvider>
    <AxiosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/zyciorys" element={<App/>}/>
          <Route path="/multimedia" element={<App/>}/>
          <Route path="/kontakt" element={<App/>}/>
          <Route path="/nuty" element={<Navigate to="/" replace/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </AxiosProvider>
  </ParallaxProvider>

)

export default AppWrapper