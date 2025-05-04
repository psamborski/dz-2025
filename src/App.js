import React, { Component } from 'react'
import axios from 'axios'
import { ParallaxProvider } from 'react-scroll-parallax'
import {
  BrowserRouter as Router, Redirect,
  Route,
  Switch
} from 'react-router-dom'
import ParallaxRefresh from './components/Helpers/ParallaxRefresh'

import './styles/App.scss'
import './components/UI/UI.scss'
import './components/UX/UX.scss'
import './styles/perfect-scrollbar.scss'

import translations from './static/files/translations.json'

// import Loader from './components/UI/Loader'

import Menu from './components/UI/Menu'
import Home from './components/Home'
import About from './components/About'
import Multimedia from './components/Multimedia'
import Contact from './components/Contact'
import Error404 from './components/UI/404'
import Loader from './components/UX/Loader'
import MusicPopup from './components/UI/MusicPopup/MusicPopup'
import BioPopup from './components/UI/BioPopup'

let scrolling

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathname: window.location.pathname,
      loading: true,
      timeoutLoading: true,
      translations: { pl: {}, en: {} },
      language: 'pl',
      isShowMusicPopupShown: window.location.pathname.endsWith('nuty'),
      isBioPopupShown: false
    }
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.detectPathnameChange)

    setTimeout(() => this.setState({ timeoutLoading: false }), 2500)

    await this.getTranslations()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.detectPathnameChange)
  }

  detectPathnameChange = () => {
    window.clearTimeout(scrolling)

    scrolling = setTimeout(() => {
      return this.state.pathname !== window.location.pathname
        ? this.setState({ pathname: window.location.pathname })
        : {}
    }, 100)
  }

  getTranslations = () => {
    axios.defaults.headers.common.Authorization = '$2y$12$u/OLECVbrHmop.a2uup5/.Fc4sPHSOgJlLz0NlE19z7s.UxSbsmWK'

    axios.get('http://cms.dariuszzimnicki.com/getTranslations')
      .then(response => {
        this.setState({ translations: response.data, loading: false })
        // console.log('Translations loading time: ', (Date.now() - this.transTimerStart) / 1000)
      })
      .catch((error) => {
        this.setState({ translations: translations, loading: false })
        console.log(error)
      })
  }

  changeLanguage = () => {
    this.setState({ language: this.state.language === 'pl' ? 'en' : 'pl' })
  }

  toggleMusicPopup = () => {
    this.setState({ isShowMusicPopupShown: !this.state.isShowMusicPopupShown })
  }

  hideMusicPopup = () => {
    this.setState({ isShowMusicPopupShown: false })
  }

  showBioPopup = () => {
    this.setState({ isBioPopupShown: true })
  }

  hideBioPopup = () => {
    this.setState({ isBioPopupShown: false })
  }

  renderAppContent = (location) =>
    <>
      <Loader show={this.state.loading || this.state.timeoutLoading} />
      <Home
        translations={this.state.translations}
        language={this.state.language}
        showBioPopup={this.showBioPopup}
      />
      <About translations={this.state.translations} language={this.state.language} />
      <Multimedia translations={this.state.translations} language={this.state.language} />
      <Contact translations={this.state.translations} language={this.state.language} />

      <MusicPopup
        isShowMusicPopupShown={this.state.isShowMusicPopupShown}
        hideMusicPopup={this.hideMusicPopup}
        language={this.state.language}
      />

      <BioPopup
        isBioPopupShown={this.state.isBioPopupShown}
        hideBioPopup={this.hideBioPopup}
        language={this.state.language}
        translations={this.state.translations}
      />
    </>

  render() {
    return (
      <ParallaxProvider>
        <ParallaxRefresh />

        <Menu
          pathname={this.state.pathname}
          language={this.state.language}
          changeLanguage={this.changeLanguage}
          toggleMusicPopup={this.toggleMusicPopup}
        />

        <Router>
          <Switch>
            <Route exact path='/' render={({ location }) => this.renderAppContent(location)} />
            <Route exact path='/zyciorys' render={({ location }) => this.renderAppContent(location)} />
            <Route exact path='/multimedia' render={({ location }) => this.renderAppContent(location)} />
            <Route exact path='/kontakt' render={({ location }) => this.renderAppContent(location)} />
            <Route
              exact path='/nuty' render={() =>
                <Redirect
                  to={{
                    pathname: '/'
                  }}
                />}
            />
            <Route component={Error404} />
          </Switch>
        </Router>
      </ParallaxProvider>
    )
  }
}

export default App
