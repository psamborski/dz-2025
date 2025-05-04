import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Element } from 'react-scroll'
import { ParallaxProvider, useParallax } from 'react-scroll-parallax' // Import hooka i provider'a
import PerfectScrollbar from 'react-perfect-scrollbar'
import CrossfadeImage from 'react-crossfade-image'

import SectionBackground from './UX/SectionBackground'

import Image1 from '../assets/gallery/1.jpg'
import Image2 from '../assets/gallery/2.jpg'
import Image3 from '../assets/gallery/3.jpg'
import Image4 from '../assets/gallery/4.jpg'
import Image5 from '../assets/gallery/5.jpg'
import Image6 from '../assets/gallery/6.jpg'
import Image7 from '../assets/gallery/7.jpg'

const Multimedia = ({ translations, language }) => {
  const [bgImage, setBgImage] = useState(Image5)

  return (
      <ParallaxProvider> {/* Wrapping the entire section in ParallaxProvider */}
        <Element name="multimedia" meta={{ title: 'Dariusz Zimnicki | Multimedia' }}>
          <section id="multimedia">
            <h2 className="mobile-title">{translations[language].multimedia_title}</h2>

            {/* Using the useParallax hook for parallax effect */}
            <ParallaxContent bgImage={bgImage} setBgImage={setBgImage} />

            <div className="left-side text">
              <SectionBackground />

              <h2>{translations[language].multimedia_title}</h2>

              <PerfectScrollbar>
                <div className="gallery-container">
                  {[Image1, Image2, Image3, Image4, Image5, Image6, Image7].map((image, index) => (
                      <img
                          key={index}
                          src={image}
                          alt={`Galeria - zdjęcie ${index + 1}`}
                          onClick={() => setBgImage(image)}
                          className={bgImage === image ? 'active-image' : ''}
                      />
                  ))}
                </div>
              </PerfectScrollbar>
              <p>
                <a
                    href={`/Dariusz_Zimnicki_zdjecia.zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  {translations[language].multimedia_link}
                </a>
              </p>
            </div>
          </section>
        </Element>
      </ParallaxProvider>
  )
}

Multimedia.propTypes = {
  translations: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

export default Multimedia

// Create a separate component for the parallax photo section
function ParallaxContent({ bgImage, setBgImage }) {
  const { ref } = useParallax({
    y: [-25, 25], // Movement range for the parallax effect
    speed: 0.5,   // Optional: adjust speed of the effect
  })

  return (
      <div
          ref={ref} // Applying the parallax effect by assigning the ref to the element
          className="right-side photo"
      >
        <CrossfadeImage
            src={bgImage}
            containerClass="photo-container"
        />
      </div>
  )
}