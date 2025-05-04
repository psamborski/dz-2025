import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { goToTop } from 'react-update-url-on-scroll'
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMenu: false
    }
  }

  preventRedirect = (event) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    goToTop()
  }

  render() {
    return (
      <nav>
        <button
          className={`menu-icon ${this.state.showMenu ? 'open-menu-icon' : 'hidden-menu-icon'}`}
          type='button'
          aria-label='Menu' aria-controls='navigation' aria-expanded={this.state.showMenu}
          onClick={() => this.setState({ showMenu: !this.state.showMenu })}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id='navigation'
          className={`${this.state.showMenu ? 'open-menu' : 'hidden-menu'}`}
        >
          <a
            href='/'
            onClick={event => this.preventRedirect(event)}
            className={`${this.props.pathname === '/' ? 'active' : ''}`}
          >
            <span className='fas fa-home' />
          </a>

          <AnchorLink
            href='/zyciorys'
            className={`${this.props.pathname === '/zyciorys' ? 'active' : ''}`}
          >
            <span className='fas fa-child' />
          </AnchorLink>

          <AnchorLink
            className={`${this.props.pathname === '/multimedia' ? 'active' : ''}`}
            href='/multimedia'
          >
            <span className='fas fa-camera' />
          </AnchorLink>

          <AnchorLink
            className={`${this.props.pathname === '/kontakt' ? 'active' : ''}`}
            href='/kontakt'
          >
            <span className='fas fa-at' />

          </AnchorLink>

          <button type='button' className='toggle-music-popup' onClick={() => this.props.toggleMusicPopup()}>
            <span className='fas fa-music' />
          </button>

          <button type='button' className='change-language' onClick={() => this.props.changeLanguage()}>
            {this.props.language === 'pl' ? 'EN' : 'PL'}
          </button>
        </div>
      </nav>
    )
  }
}

Menu.propTypes = {
  pathname: PropTypes.string,
  language: PropTypes.string,
  changeLanguage: PropTypes.func,
  toggleMusicPopup: PropTypes.func
}
