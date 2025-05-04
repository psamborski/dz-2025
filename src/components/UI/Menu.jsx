import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { Link as ScrollLink } from 'react-scroll'

const Menu = ({ pathname, language, changeLanguage, toggleMusicPopup }) => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  return (
      <nav>
        <button
            className={clsx('menu-icon', { 'open-menu-icon': showMenu, 'hidden-menu-icon': !showMenu })}
            type='button'
            aria-label='Menu'
            aria-controls='navigation'
            aria-expanded={showMenu}
            onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <div
            id='navigation'
            className={clsx({ 'open-menu': showMenu, 'hidden-menu': !showMenu })}
        >
          <ScrollLink
              to='top'
              smooth
              duration={500}
              className={clsx({ active: pathname === '/' })}
          >
            <span className='fas fa-home' />
          </ScrollLink>

          <ScrollLink
              to='zyciorys'
              smooth
              duration={500}
              className={clsx({ active: pathname === '/zyciorys' })}
          >
            <span className='fas fa-child' />
          </ScrollLink>

          <ScrollLink
              to='multimedia'
              smooth
              duration={500}
              className={clsx({ active: pathname === '/multimedia' })}
          >
            <span className='fas fa-camera' />
          </ScrollLink>

          <ScrollLink
              to='kontakt'
              smooth
              duration={500}
              className={clsx({ active: pathname === '/kontakt' })}
          >
            <span className='fas fa-at' />
          </ScrollLink>

          <button type='button' className='toggle-music-popup' onClick={toggleMusicPopup}>
            <span className='fas fa-music' />
          </button>

          <button type='button' className='change-language' onClick={changeLanguage}>
            {language === 'pl' ? 'EN' : 'PL'}
          </button>
        </div>
      </nav>
  )
}

Menu.propTypes = {
  pathname: PropTypes.string.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
  changeLanguage: PropTypes.func.isRequired,
  toggleMusicPopup: PropTypes.func.isRequired
}

export default Menu