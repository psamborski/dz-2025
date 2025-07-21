import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Element } from 'react-scroll'
import { Parallax } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import CrossfadeImage from 'react-crossfade-image'

import useScrollSpy from '../hooks/useScrollSpy.jsx'
import SectionBackground from './UX/SectionBackground'

const Multimedia = ({ appData, language }) => {
  const t = useMemo(
    () => appData?.[`${language}Multimedia`]?.items?.[0] || {},
    [appData, language]
  )

  const photos = useMemo(() => t?.multimediaPhotosCollection?.items || [], [t])
  const gallery = useMemo(() => photos.filter(photo => !!photo.url), [photos])

  const archive = t?.multimediaArchiveLink
  const archiveTitle = t?.multimediaArchiveTitle

  const sectionRef = useScrollSpy('multimedia', '/multimedia')

  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    if (gallery.length > 0 && !bgImage) {
      setBgImage(gallery[0].url)
    }
  }, [gallery, bgImage])

  return (
    <Element name="multimedia" meta={{ title: 'Dariusz Zimnicki | Multimedia' }}>
      <section id="multimedia" ref={sectionRef}>
        <h2 className="mobile-title">{t.multimediaTitle}</h2>

        <div className="parallax-outer right-side photo">
          <Parallax
            className="parallax-inner"
            translateY={[-25, 25]}
            style={{ height: '100%' }}
          >
            <CrossfadeImage
              src={bgImage}
              containerClass="photo-container"
            />
          </Parallax>
        </div>

        <div className="left-side text">
          <SectionBackground />

          <h2>{t.multimediaTitle}</h2>

          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <div className="gallery-container">
              {gallery.map((image, index) => (
                <img
                  key={image.url || index}
                  src={image.url}
                  alt={image.title || `Galeria - zdjęcie ${index + 1}`}
                  onClick={() => setBgImage(image.url)}
                  className={bgImage === image.url ? 'active-image' : ''}
                />
              ))}
            </div>
          </PerfectScrollbar>

          {archive?.url && (
            <p>
              <a
                href={archive.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {archiveTitle || 'Pobierz zdjęcia'}
              </a>
            </p>
          )}
        </div>
      </section>
    </Element>
  )
}

Multimedia.propTypes = {
  appData: PropTypes.object.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
}

export default Multimedia