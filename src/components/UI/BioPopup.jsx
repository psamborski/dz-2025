import React from 'react'
import PropTypes from 'prop-types'

export default function BioPopup({
                                   isBioPopupShown,
                                   hideBioPopup,
                                   translations,
                                   language
                                 }) {
  return (
    <section
      id='bio-popup'
      className={isBioPopupShown ? '' : 'popup-hidden'}
      onClick={event => {
        if (event.target.id === 'bio-popup') {
          hideBioPopup()
        }
      }}
    >
      <div className='popup-container'>
        <div
          className='close-popup'
          onClick={hideBioPopup}
        >
          <span className='fas fa-times'/>
        </div>

        <h3>{translations[language].cv_title}</h3>

        <div
          className='popup-content'
          dangerouslySetInnerHTML={{__html: translations[language].cv_content}}
        />
      </div>
    </section>
  )
}

BioPopup.propTypes = {
  isBioPopupShown: PropTypes.bool.isRequired,
  hideBioPopup: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}