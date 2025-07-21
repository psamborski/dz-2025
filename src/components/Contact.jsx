import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Element } from 'react-scroll'
import { Parallax } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from '../hooks/useScrollSpy.jsx'

export default function Contact({ appData, language }) {
  const sectionRef = useScrollSpy('kontakt', '/kontakt')

  const staticData = appData?.contactStatic?.items?.[0] || {}
  const t = appData?.[`${language}Contact`]?.items?.[0] || {}

  const instaLinks = useMemo(() => (staticData.instagramLink || '').split(';'), [staticData.instagramLink])
  const instaTrans = useMemo(() => (t.instagramTitle || '').split(';'), [t.instagramTitle])
  const fbLinks = useMemo(() => (staticData.facebookLink || '').split(';'), [staticData.facebookLink])
  const fbTrans = useMemo(() => (t.facebookTitle || '').split(';'), [t.facebookTitle])

  const photoStyle = staticData?.contactPhoto?.url ? { backgroundImage: `url(${staticData.contactPhoto.url})` } : {}

  return (
    <Element name="kontakt">
      <section id="kontakt" ref={sectionRef}>
        <h2 className="mobile-title">{t.contactTitle}</h2>

        <div className="parallax-outer left-side photo">
          <Parallax
            className="parallax-inner"
            translateY={[-25, 25]}
            style={{ height: '100%' }}
          >
            <div className="photo-container" style={photoStyle} />
          </Parallax>
        </div>

        <div className="right-side text">
          <SectionBackground />

          <h2>{t.contactTitle}</h2>

          <PerfectScrollbar>
            <div className="contact-container">
              <ContactItem
                iconClass="fas fa-envelope"
                href={`mailto:${staticData.emailAddress}`}
                text={staticData.emailAddress}
              />

              <ContactItem
                iconClass="fas fa-phone"
                href={`tel:${staticData.phoneNumber}`}
                text={staticData.phoneNumber}
              />

              <ContactItemGroup
                iconClass="fab fa-instagram"
                links={instaLinks}
                labels={instaTrans}
              />

              <ContactItemGroup
                iconClass="fab fa-facebook-square"
                links={fbLinks}
                labels={fbTrans}
              />
            </div>
          </PerfectScrollbar>
        </div>
      </section>
    </Element>
  )
}

function ContactItem({ iconClass, href, text }) {
  if (!text) return null

  return (
    <div className="contact-item">
      <div className="contact-icon-container">
        <span className={clsx('icon', iconClass)} />
      </div>
      <a href={href} className="contact-desc">
        {text}
      </a>
    </div>
  )
}

function ContactItemGroup({ iconClass, links, labels }) {
  return (
    <div className="contact-item">
      <div className="contact-icon-container">
        <span className={clsx('icon', iconClass)} />
      </div>
      {links.map((link, index) =>
        link ? (
          <a
            key={link || index}
            href={link}
            className="contact-desc"
            dangerouslySetInnerHTML={{ __html: labels[index] || '#' }}
          />
        ) : null
      )}
    </div>
  )
}

Contact.propTypes = {
  appData: PropTypes.object.isRequired,
  language: PropTypes.oneOf(['pl', 'en']).isRequired,
}

ContactItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

ContactItemGroup.propTypes = {
  iconClass: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
}