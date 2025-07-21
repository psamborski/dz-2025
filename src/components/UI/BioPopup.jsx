import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function BioPopup({ appData, isBioPopupShown, hideBioPopup, language }) {
  const t = appData?.[`${language}Hero`]?.items?.[0]

  return (
    <section
      id="bio-popup"
      className={clsx({ 'popup-hidden': !isBioPopupShown })}
      onClick={(event) => {
        if (event.target.id === 'bio-popup') {
          hideBioPopup()
        }
      }}
    >
      <div className="popup-container">
        <div
          className="close-popup"
          onClick={hideBioPopup}
        >
          <span className="fas fa-times" />
        </div>

        {t?.cvTitle && <h3>{t.cvTitle}</h3>}

        <div className="popup-content">
          {t?.cvContent?.json && documentToReactComponents(t.cvContent.json)}
        </div>
      </div>
    </section>
  )
}

BioPopup.propTypes = {
  appData: PropTypes.object.isRequired,
  isBioPopupShown: PropTypes.bool.isRequired,
  hideBioPopup: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
}