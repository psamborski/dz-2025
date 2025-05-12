import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Element} from 'react-scroll'
import {Parallax} from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SectionBackground from './UX/SectionBackground'

const About = ({translations, language}) => {
  const [activeTab, setActiveTab] = useState('achievements')

  const handleSwitchTab = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  const handleKeyUp = useCallback((event, tab) => {
    if (event.key === 'Enter') {
      setActiveTab(tab)
    }
  }, [])

  const t = translations[language]

  const tabs = [
    {key: 'achievements', title: t.resume_section_achievements_title, content: t.resume_section_achievements_content},
    {key: 'choirs', title: t.resume_section_choirs_title, content: t.resume_section_choirs_content},
    {key: 'compositions', title: t?.resume_section_compositions_title, content: t?.resume_section_compositions_content}
  ]

  return (
    <Element name="zyciorys">
      <section id="zyciorys">
        <h2 className="mobile-title">{t.resume_title}</h2>

        <div className={'parallax-outer left-side photo'}>
          <Parallax
            className='parallax-inner'
            translateY={[-25, 25]}
            style={{height: '100%'}}
          >
            <div className='photo-container'/>
          </Parallax>
        </div>

        <div className="right-side text">
          <SectionBackground/>
          <h2>{t.resume_title}</h2>

          <div className="about-switch-container">
            {tabs.map(({key, title}) => (
              <span
                key={key}
                className={clsx('about-switch', {active: activeTab === key, hidden: activeTab !== key})}
                onClick={() => handleSwitchTab(key)}
                onKeyUp={(e) => handleKeyUp(e, key)}
                tabIndex="0"
              >
                  {title}
                </span>
            ))}
          </div>

          <div className={clsx('about-box-container', activeTab)}>
            {tabs.map(({key, content}) => (
              <div
                key={key}
                className={clsx('about-box', {active: activeTab === key, hidden: activeTab !== key})}
              >
                <PerfectScrollbar>
                  <p dangerouslySetInnerHTML={{__html: content}}/>
                </PerfectScrollbar>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  )
}

About.propTypes = {
  translations: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
}

export default About