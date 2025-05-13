import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Element} from 'react-scroll'
import {Parallax} from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import SectionBackground from './UX/SectionBackground'
import useScrollSpy from "../hooks/useScrollSpy.jsx";

export default function Contact({translations, language}) {
  const t = translations?.[language] || {}

  const sectionRef = useScrollSpy('kontakt', '/kontakt');

  const instaLinks = useMemo(() => (t.socialmedia_instagram_link || '').split(';'), [t.socialmedia_instagram_link])
  const instaTrans = useMemo(() => (t.socialmedia_instagram_title || '').split(';'), [t.socialmedia_instagram_title])
  const fbLinks = useMemo(() => (t.socialmedia_fb_link || '').split(';'), [t.socialmedia_fb_link])
  const fbTrans = useMemo(() => (t.socialmedia_fb_title || '').split(';'), [t.socialmedia_fb_title])

  return (
    <Element name="kontakt">
      <section id="kontakt" ref={sectionRef}>
        <h2 className="mobile-title">{t.socialmedia_title}</h2>

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

          <h2>{t.socialmedia_title}</h2>

          <PerfectScrollbar>
            <div className="contact-container">
              <ContactItem
                iconClass="fas fa-envelope"
                href={`mailto:${t.socialmedia_email}`}
                text={t.socialmedia_email}
              />

              <ContactItem
                iconClass="fas fa-phone"
                href={`tel:${t.socialmedia_phone}`}
                text={t.socialmedia_phone}
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

function ContactItem({iconClass, href, text}) {
  return (
    <div className="contact-item">
      <div className="contact-icon-container">
        <span className={clsx('icon', iconClass)}/>
      </div>
      <a href={href} className="contact-desc">
        {text}
      </a>
    </div>
  )
}

function ContactItemGroup({iconClass, links, labels}) {
  return (
    <div className="contact-item">
      <div className="contact-icon-container">
        <span className={clsx('icon', iconClass)}/>
      </div>
      {links.map((link, index) => (
        <a
          key={link || index}
          href={link}
          className="contact-desc"
          dangerouslySetInnerHTML={{__html: labels[index] || '#'}}
        />
      ))}
    </div>
  )
}

Contact.propTypes = {
  translations: PropTypes.object,
  language: PropTypes.string
}

ContactItem.propTypes = {
  iconClass: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

ContactItemGroup.propTypes = {
  iconClass: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired
}