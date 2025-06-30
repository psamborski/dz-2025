import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Parallax} from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

import '../styles/perfect-scrollbar.scss'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from '../hooks/useScrollSpy.jsx'

export default function Home({appData, language, showBioPopup}) {
  const [t, setT] = useState(null)
  const [bioPdf, setBioPdf] = useState(null)
  const [bioDocx, setBioDocx] = useState(null)

  const docExtensions = ['.docx', '.doc']

  useEffect(() => {
    setT(appData?.[`${language}Hero`]?.items?.[0])
  }, [appData, language])

  useEffect(() => {
    setBioPdf((t?.cvFilesCollection?.items || []).find(file => file?.url?.toLowerCase().endsWith('.pdf')))

    setBioDocx(
      (t?.cvFilesCollection?.items || []).find(file =>
        docExtensions.some(ext => file?.url?.toLowerCase().endsWith(ext))
      )
    )  }, [t])

  const sectionRef = useScrollSpy('home', '/');

  return (
    <section id="home" ref={sectionRef}>
      <div className="right-side photo">
        <h1 className="mobile-title">{t?.websiteTitle}</h1>

        <Parallax translateY={[-25, 25]} style={{height: '100%'}}>
          <div className='photo-container' style={{height: '100%'}}/>
        </Parallax>
      </div>

      <div className="left-side text">
        <SectionBackground/>

        <h1>{t?.websiteTitle}</h1>

        <PerfectScrollbar>
          <div className="bio-files-container">
              <span className="bio" onClick={showBioPopup}>
                CV
              </span>

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

          <div
            className="text-container"
          >
            {documentToReactComponents(t?.homeText?.json)}
          </div>
        </PerfectScrollbar>
      </div>
    </section>
  )
}

Home.propTypes = {
  appData: PropTypes.object.isRequired,
  showBioPopup: PropTypes.func,
  language: PropTypes.string,
}