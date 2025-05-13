import React from 'react'
import PropTypes from 'prop-types'
import {Parallax} from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'

import '../styles/perfect-scrollbar.scss'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from "../hooks/useScrollSpy.jsx";

export default function Home({translations, language, showBioPopup}) {
  const t = translations?.[language] || {}

  const sectionRef = useScrollSpy('home', '/');

  return (
    <section id="home" ref={sectionRef}>
      <div className="right-side photo">
        <h1 className="mobile-title">{t.hero_title}</h1>

        <Parallax translateY={[-25, 25]} style={{height: '100%'}}>
          <div className='photo-container' style={{height: '100%'}}/>
        </Parallax>
      </div>

      <div className="left-side text">
        <SectionBackground/>

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
            dangerouslySetInnerHTML={{__html: t.hero_content}}
          />
        </PerfectScrollbar>
      </div>
    </section>
  )
}

Home.propTypes = {
  translations: PropTypes.object,
  showBioPopup: PropTypes.func,
  language: PropTypes.string,
}