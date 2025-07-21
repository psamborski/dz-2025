import {useEffect, useState} from 'react'
import {ParallaxProvider} from 'react-scroll-parallax'
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'

import ParallaxRefresh from './components/Helpers/ParallaxRefresh'

import './styles/App.scss'
import './components/UI/UI.scss'
import './components/UX/UX.scss'
import './styles/perfect-scrollbar.scss'

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
import {useAppData} from "./api/hooks/useAppData.jsx"
import {ErrorBoundary} from './components/Helpers/ErrorBoundary.jsx'

const usePathname = () => {
  const location = useLocation()
  return location.pathname
}

const AppContent = ({appData, language, showBioPopup}) => (
  <>
    <Home
      appData={appData}
      language={language}
      showBioPopup={showBioPopup}
    />
    <About
      appData={appData}
      language={language}
    />
    <Multimedia
      appData={appData}
      language={language}
    />
    <Contact
      appData={appData}
      language={language}
    />
  </>
)

const App = () => {
  const pathname = usePathname()
  const {getAppData} = useAppData()

  const [appData, setAppData] = useState(null)
  const [timeoutLoading, setTimeoutLoading] = useState(true)
  const [language, setLanguage] = useState('pl')
  const [isMusicPopupShown, setMusicPopupShown] = useState(pathname.endsWith('nuty'))
  const [isBioPopupShown, setBioPopupShown] = useState(false)

  const [error, setError] = useState(null)

  useEffect(() => {
    getAppData()
      .then(resp => {
        setAppData(
          resp.data?.data || {},
        )
      })
      .catch(e => {
        console.error(e)
        setError(e)
        throw new Error('Invalid call')
      })
  }, [getAppData])

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutLoading(false), 2000)

    return () => clearTimeout(timer)
  }, [])

  const changeLanguage = () => {
    setLanguage((prev) => (prev === 'pl' ? 'en' : 'pl'))
  }

  if (error) throw new Error(typeof error === 'string' ? error : error?.message)

  return (
    <ParallaxProvider>
      <ParallaxRefresh/>

      <Menu
        pathname={pathname}
        language={language}
        changeLanguage={changeLanguage}
        toggleMusicPopup={() => setMusicPopupShown(!isMusicPopupShown)}
      />

      <Loader show={timeoutLoading}/>

      <AppContent
        appData={appData}
        language={language}
        showBioPopup={() => setBioPopupShown(true)}
      />

      <MusicPopup
        isShowMusicPopupShown={isMusicPopupShown}
        hideMusicPopup={() => setMusicPopupShown(false)}
        language={language}
      />

      <BioPopup
        appData={appData}
        isBioPopupShown={isBioPopupShown}
        hideBioPopup={() => setBioPopupShown(false)}
        language={language}
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
          <Route path="/nuty" element={<App/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </AxiosProvider>
  </ParallaxProvider>

)

export default AppWrapper