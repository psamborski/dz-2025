import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParallax, ParallaxProvider } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'

import '../styles/perfect-scrollbar.scss'
import SectionBackground from './UX/SectionBackground'

export default function Home({ translations, language, showBioPopup }) {
  const t = translations?.[language] || {}

  return (
      <ParallaxProvider> {/* Wrapping entire component with ParallaxProvider */}
        <section id="home">
          <div className="right-side photo">
            <h1 className="mobile-title">{t.hero_title}</h1>

            {/* Using useParallax hook for the photo container */}
            <ParallaxContent />
          </div>

          <div className="left-side text">
            <SectionBackground />

            <h1>{t.hero_title}</h1>

            <PerfectScrollbar>
              <div className="bio-files-container">
              <span className="bio" onClick={showBioPopup}>
                CV
              </span>

                {t.bio_pdf && (
                    <a
                        className={clsx('fas fa-file-pdf', 'pdf')}
                        href={t.bio_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                )}

                {t.bio_docx && (
                    <a
                        className={clsx('fas fa-file-word', 'word')}
                        href={t.bio_docx}
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                )}
              </div>

              <div
                  className="text-container"
                  dangerouslySetInnerHTML={{ __html: t.hero_content }}
              />
            </PerfectScrollbar>
          </div>
        </section>
      </ParallaxProvider>
  )
}

Home.propTypes = {
  translations: PropTypes.object,
  showBioPopup: PropTypes.func,
  language: PropTypes.string,
}

// Create a separate component that uses useParallax hook for parallax effect
function ParallaxContent() {
  const { ref } = useParallax({
    y: [-25, 25], // Adjust the parallax effect (movement range)
    speed: 0.5,   // Optional: Set speed of the effect
  })

  return (
      <div
          ref={ref} // This is where the parallax effect is applied
          className="photo-container"
      />
  )
}