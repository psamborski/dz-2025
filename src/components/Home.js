import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Parallax } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import '../styles/perfect-scrollbar.scss'

import SectionBackground from './UX/SectionBackground'

export default class Home extends Component {
  render() {
    return (
      <section id='home'>
        <div className='right-side photo'>
          <h1 className='mobile-title'>{this.props.translations[this.props.language].hero_title}</h1>

          <Parallax
            y={[-25, 25]}
            tagOuter='div'
            styleOuter={{ height: '100%' }}
            styleInner={{ height: '100%' }}
          >
            <div className='photo-container' />
          </Parallax>
        </div>
        <div className='left-side text'>
          <SectionBackground />

          <h1>{this.props.translations[this.props.language].hero_title}</h1>
          {/* eslint-disable-next-line max-len */}
          <PerfectScrollbar>
            <div className='bio-files-container'>
              <span
                className='bio'
                onClick={() => this.props.showBioPopup()}
              >
                CV
              </span>
              {this.props.translations[this.props.language]?.bio_pdf &&
                <a
                  className='fas fa-file-pdf pdf'
                  href={this.props.translations[this.props.language]?.bio_pdf} target='_blank'
                  rel='noopener noreferrer'
                />}
              {this.props.translations[this.props.language]?.bio_docx &&
                <a
                  className='fas fa-file-word word'
                  href={this.props.translations[this.props.language].bio_docx}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              }
            </div>
            <div className='text-container' dangerouslySetInnerHTML={{ __html: this.props.translations[this.props.language].hero_content }} />
          </PerfectScrollbar>
        </div>
      </section>
    )
  }
}

Home.propTypes = {
  translations: PropTypes.object,
  showBioPopup: PropTypes.func,
  language: PropTypes.string
}
