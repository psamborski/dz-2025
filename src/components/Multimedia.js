import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableSection from 'react-update-url-on-scroll'
import { Parallax } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import CrossfadeImage from 'react-crossfade-image'

import SectionBackground from './UX/SectionBackground'

import Image1 from '../static/gallery/1.jpg'
import Image2 from '../static/gallery/2.jpg'
import Image3 from '../static/gallery/3.jpg'
import Image4 from '../static/gallery/4.jpg'
import Image5 from '../static/gallery/5.jpg'
import Image6 from '../static/gallery/6.jpg'
import Image7 from '../static/gallery/7.jpg'

export default class Multimedia extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bgImage: Image5
    }
  }

  render() {
    return (
      <ScrollableSection name='multimedia' meta={{ title: 'Dariusz Zimnicki | Multimedia' }}>
        <section id='multimedia'>
          <h2 className='mobile-title'>{this.props.translations[this.props.language].multimedia_title}</h2>

          <Parallax
            className='right-side photo'
            y={[-25, 25]}
            tagOuter='div'
            styleInner={{ height: '100%' }}
          >
            {/* <div className='photo-container' style={{ backgroundImage: `url('${this.state.bgImage}')` }} /> */}
            <CrossfadeImage
              src={this.state.bgImage}
              containerClass='photo-container'
            />
          </Parallax>
          <div className='left-side text'>
            <SectionBackground />

            <h2>{this.props.translations[this.props.language].multimedia_title}</h2>
            {/* eslint-disable-next-line max-len */}

            <PerfectScrollbar>
              <div className='gallery-container'>
                <img
                  src={Image1 /* require('../static/gallery/1.jpg') */}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image1 })}
                  className={`${this.state.bgImage === Image1 ? 'active-image' : ''}`}
                />
                <img
                  src={Image2 /* require('../static/gallery/1.jpg') */}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image2 })}
                  className={`${this.state.bgImage === Image2 ? 'active-image' : ''}`}
                />
                <img
                  src={Image3 /* require('../static/gallery/1.jpg') */}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image3 })}
                  className={`${this.state.bgImage === Image3 ? 'active-image' : ''}`}
                />
                <img
                  src={Image4 /* require('../static/gallery/1.jpg') */}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image4 })}
                  className={`${this.state.bgImage === Image4 ? 'active-image' : ''}`}
                />
                <img
                  src={Image5}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image5 })}
                  className={`${this.state.bgImage === Image5 ? 'active-image' : ''}`}
                />
                <img
                  src={Image6}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image6 })}
                  className={`${this.state.bgImage === Image6 ? 'active-image' : ''}`}
                />
                <img
                  src={Image7}
                  alt='Galeria - zdjęcie'
                  onClick={() => this.setState({ bgImage: Image7 })}
                  className={`${this.state.bgImage === Image7 ? 'active-image' : ''}`}
                />
              </div>
            </PerfectScrollbar>
            <p>
              <a
                href={`${process.env.PUBLIC_URL}/Dariusz_Zimnicki_zdjecia.zip`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {this.props.translations[this.props.language].multimedia_link}
              </a>
            </p>

          </div>
        </section>
      </ScrollableSection>
    )
  }
}

Multimedia.propTypes = {
  translations: PropTypes.object,
  language: PropTypes.string
}
