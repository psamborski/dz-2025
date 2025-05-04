import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Element } from 'react-scroll'
import { ParallaxProvider, useParallax } from 'react-scroll-parallax' // Import hooka i provider'a
import PerfectScrollbar from 'react-perfect-scrollbar'
import clsx from 'clsx'
import SectionBackground from './UX/SectionBackground'

export default function Contact({ translations, language }) {
    const t = translations?.[language] || {}

    const instaLinks = useMemo(() => (t.socialmedia_instagram_link || '').split(';'), [t.socialmedia_instagram_link])
    const instaTrans = useMemo(() => (t.socialmedia_instagram_title || '').split(';'), [t.socialmedia_instagram_title])
    const fbLinks = useMemo(() => (t.socialmedia_fb_link || '').split(';'), [t.socialmedia_fb_link])
    const fbTrans = useMemo(() => (t.socialmedia_fb_title || '').split(';'), [t.socialmedia_fb_title])

    return (
        <ParallaxProvider> {/* Wrapping the section with ParallaxProvider */}
            <Element name="kontakt">
                <section id="kontakt">
                    <h2 className="mobile-title">{t.socialmedia_title}</h2>

                    {/* Using the useParallax hook for the left side photo effect */}
                    <ParallaxPhoto />

                    <div className="right-side text">
                        <SectionBackground />

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
        </ParallaxProvider>
    )
}

function ContactItem({ iconClass, href, text }) {
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
            {links.map((link, index) => (
                <a
                    key={link || index}
                    href={link}
                    className="contact-desc"
                    dangerouslySetInnerHTML={{ __html: labels[index] || '#' }}
                />
            ))}
        </div>
    )
}

// Parallax effect for the left-side photo
function ParallaxPhoto() {
    const { ref } = useParallax({
        y: [-25, 25], // Range of movement
        speed: 0.5,   // Optional: adjust speed of the effect
    })

    return (
        <div
            ref={ref} // Apply parallax effect to this div
            className="left-side photo"
        >
            <div className="photo-container" />
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