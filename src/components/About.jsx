import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Element} from 'react-scroll'
import {Parallax} from 'react-scroll-parallax'
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

import PerfectScrollbar from 'react-perfect-scrollbar'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from '../hooks/useScrollSpy.jsx'


const About = ({appData, language}) => {
  const [activeTab, setActiveTab] = useState('achievements');
  const [t, setT] = useState(null)
  const [tabs, setTabs] = useState([])

  const sectionRef = useScrollSpy('zyciorys', '/zyciorys');

  const handleSwitchTab = useCallback((tab) => setActiveTab(tab), []);
  const handleKeyUp = useCallback((event, tab) => {
    if (event.key === 'Enter') setActiveTab(tab);
  }, [])

  useEffect(() => {
    setT(appData?.[`${language}Bio`]?.items?.[0])
  }, [appData, language])

  useEffect(() => {
    if (t) {
      setTabs([
        {
          key: 'achievements',
          title: t?.achievementsTitle,
          content: documentToReactComponents(t?.achievementsContent?.json || {})
        },
        {
          key: 'choirs',
          title: t?.choirsTitle,
          content: documentToReactComponents(t?.choirsContent?.json || {})},
        {
          key: 'compositions',
          title: t?.compositionsTitle,
          content: documentToReactComponents(t?.compositionsContent?.json || {})
        }
      ])
    }
  }, [t])

  return (
    <Element name="zyciorys">
      <section id="zyciorys" ref={sectionRef}>
        <h2 className="mobile-title">{t?.bioTitle}</h2>

        <div className="parallax-outer left-side photo">
          <Parallax className="parallax-inner" translateY={[-25, 25]} style={{height: '100%'}}>
            <div className="photo-container"/>
          </Parallax>
        </div>

        <div className="right-side text">
          <SectionBackground/>
          <h2>{t?.bioTitle}</h2>

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
                  <div>
                    {content}
                  </div>
                </PerfectScrollbar>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

About.propTypes = {
  appData: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default About;