import React from 'react'
import PropTypes from 'prop-types'
import {Parallax} from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import {Element} from 'react-scroll'

import '../styles/perfect-scrollbar.scss'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from '../hooks/useScrollSpy.jsx'

export default function Home({appData, language, showBioPopup}) {
  const sectionRef = useScrollSpy('home', '/')

  const t = appData?.[`${language}Hero`]?.items?.[0] || {}
  const staticData = appData?.heroStatic?.items?.[0] || {}

  const files = t?.cvFilesCollection?.items || []
  const bioPdf = files.find(file => file?.url?.toLowerCase().endsWith('.pdf'))
  const bioDocx = files.find(file =>
    ['.docx', '.doc'].some(ext => file?.url?.toLowerCase().endsWith(ext))
  )

  // const photoStyle = staticData?.homePhoto?.url ? { backgroundImage: `url(${staticData.homePhoto?.url})` } : {}
  const hasPhoto = Boolean(staticData?.homePhoto?.url)
  const desktopPosition = staticData?.backgroundPosition || '50% 50%'
  const mobilePosition = staticData?.backgroundPositionMobile || desktopPosition

  const photoStyle = hasPhoto
    ? {
      backgroundImage: `url(${staticData.homePhoto.url})`,
      '--bg-pos-home': desktopPosition,
      '--bg-pos-home-mobile': mobilePosition,
    }
    : {}
  return (
    <Element name="home">
      <section id="home" ref={sectionRef}>
        <div className="right-side photo">
          <h1 className="mobile-title">{t.websiteTitle}</h1>

          <Parallax translateY={[-25, 25]} style={{height: '100%'}}>
            <div className="photo-container" style={{height: '100%', ...photoStyle}}/>
          </Parallax>
        </div>

        <div className="left-side text">
          <SectionBackground/>

          <h1>{t.websiteTitle}</h1>

          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <div className="bio-files-container">
              <span className="bio" onClick={showBioPopup}>CV</span>

              {bioPdf && (
                <a
                  className={clsx('fas fa-file-pdf', 'pdf')}
                  href={bioPdf.url}
                  title={bioPdf.title}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}

              {bioDocx && (
                <a
                  className={clsx('fas fa-file-word', 'word')}
                  href={bioDocx.url}
                  title={bioDocx.title}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              )}
            </div>

            <div className="text-container">
              {t?.homeText?.json && documentToReactComponents(t.homeText.json)}
            </div>
          </PerfectScrollbar>
        </div>
      </section>
    </Element>
  )
}

Home.propTypes = {
  appData: PropTypes.object.isRequired,
  showBioPopup: PropTypes.func,
  language: PropTypes.string,
}