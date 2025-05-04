import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import PerfectScrollbar from 'react-perfect-scrollbar'
// import '../../styles/perfect-scrollbar.scss'

export default class BioPopup extends Component {
  render() {
    return (
      <section
        id='bio-popup'
        className={this.props.isBioPopupShown ? '' : 'popup-hidden'}
        onClick={event => {
          if (event.target.id === 'bio-popup') {
            this.props.hideBioPopup()
          }
        }}
      >
        <div
          className='popup-container'
        >
          <div
            className='close-popup'
            onClick={() => this.props.hideBioPopup()}
          >
            <span className='fas fa-times' />
          </div>

          <h3>{this.props.translations[this.props.language].cv_title}</h3>

          {/* <PerfectScrollbar> */}
          <div
            className='popup-content'
            dangerouslySetInnerHTML={{ __html: this.props.translations[this.props.language].cv_content }}
          />
          {/* </PerfectScrollbar> */}
        </div>
      </section>
    )
  }
}

BioPopup.propTypes = {
  isBioPopupShown: PropTypes.bool,
  hideBioPopup: PropTypes.func,
  translations: PropTypes.object,
  language: PropTypes.string
}
