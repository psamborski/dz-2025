import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableSection from 'react-update-url-on-scroll'
import { Parallax } from 'react-scroll-parallax'
import SectionBackground from './UX/SectionBackground'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default class Contact extends Component {
  render() {
    const instaLinks = (this.props.translations?.[this.props.language]?.socialmedia_instagram_link || '')
      .split(';')
    const instaTrans = (this.props.translations?.[this.props.language]?.socialmedia_instagram_title || '')
      .split(';')

    const fbLinks = (this.props.translations?.[this.props.language]?.socialmedia_fb_link || '')
      .split(';')
    const fbTrans = (this.props.translations?.[this.props.language]?.socialmedia_fb_title || '')
      .split(';')

    return (
      <ScrollableSection name='kontakt' meta={{ title: 'Dariusz Zimnicki | Kontakt' }}>
        <section id='kontakt'>
          <h2 className='mobile-title'>{this.props.translations[this.props.language].socialmedia_title}</h2>

          <Parallax
            className='left-side photo'
            y={[-25, 25]}
            tagOuter='div'
            styleInner={{ height: '100%' }}
          >
            <div className='photo-container' />
          </Parallax>
          <div className='right-side text'>
            <SectionBackground />

            <h2>{this.props.translations[this.props.language].socialmedia_title}</h2>

            <PerfectScrollbar>

              <div className='contact-container'>
                <div className='contact-item'>
                  <div className='contact-icon-container'>
                    <span className='icon fas fa-envelope' />
                  </div>
                  <a href={`mailto:${this.props.translations[this.props.language].socialmedia_email}`} className='contact-desc'>
                    {this.props.translations[this.props.language].socialmedia_email}
                  </a>
                </div>
                <div className='contact-item'>
                  <div className='contact-icon-container'>
                    <span className='icon fas fa-phone' />
                  </div>
                  <a href={`tel:${this.props.translations[this.props.language].socialmedia_phone}`} className='contact-desc'>
                    {this.props.translations[this.props.language].socialmedia_phone}
                  </a>
                </div>
                <div className='contact-item'>
                  <div className='contact-icon-container'>
                    <span className='icon fab fa-instagram' />
                  </div>
                  {instaLinks.map((socialLink, index) =>
                    <a
                      key={socialLink}
                      href={socialLink}
                      className='contact-desc'
                      dangerouslySetInnerHTML={{ __html: instaTrans[index] || '#' }}
                    />
                  )}
                </div>
                <div className='contact-item'>
                  <div className='contact-icon-container'>
                    <span className='icon fab fa-facebook-square' />
                  </div>
                  {fbLinks.map((socialLink, index) =>
                    <a
                      key={socialLink}
                      href={socialLink}
                      className='contact-desc'
                      dangerouslySetInnerHTML={{ __html: fbTrans[index] || '#' }}
                    />
                  )}
                </div>
              </div>
            </PerfectScrollbar>

          </div>
        </section>
      </ScrollableSection>
    )
  }
}

Contact.propTypes = {
  translations: PropTypes.object,
  language: PropTypes.string
}
