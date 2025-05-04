import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScrollableSection from 'react-update-url-on-scroll'
import { Parallax } from 'react-scroll-parallax'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SectionBackground from './UX/SectionBackground'

export default class About extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 'achievements'
    }
  }

  onEnter = (event, tab) => {
    if (event.keyCode === 13) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    return (
      <ScrollableSection name='zyciorys' meta={{ title: 'Dariusz Zimnicki | Życiorys' }}>
        <section id='zyciorys'>
          <h2 className='mobile-title'>{this.props.translations[this.props.language].resume_title}</h2>

          <Parallax
            className='left-side photo'
            y={[-25, 25]}
            tagOuter='div'
            styleInner={{ height: '100%' }}
          >
            <div className='photo-container' />
          </Parallax>
          <div className='right-side text'>
            <SectionBackground />

            <h2>{this.props.translations[this.props.language].resume_title}</h2>

            <div className='about-switch-container'>
              <span
                className={`${this.state.activeTab === 'achievements' ? 'active' : 'hidden'} about-switch`}
                onClick={() => this.setState({ activeTab: 'achievements' })}
                onKeyUp={e => this.onEnter(e, 'achievements')}
                tabIndex='0'
              >
                {this.props.translations[this.props.language].resume_section_achievements_title}
              </span>

              <span
                className={`${this.state.activeTab === 'choirs' ? 'active' : 'hidden'} about-switch`}
                onClick={() => this.setState({ activeTab: 'choirs' })}
                onKeyUp={e => this.onEnter(e, 'choirs')}
                tabIndex='0'
              >
                {this.props.translations[this.props.language].resume_section_choirs_title}
              </span>

              <span
                className={`${this.state.activeTab === 'compositions' ? 'active' : 'hidden'} about-switch`}
                onClick={() => this.setState({ activeTab: 'compositions' })}
                onKeyUp={e => this.onEnter(e, 'compositions')}
                tabIndex='0'
              >
                {this.props.translations[this.props.language]?.resume_section_compositions_title}
              </span>
            </div>

            <div className={`about-box-container ${this.state.activeTab}`}>

              <div
                className={`about-box ${this.state.activeTab === 'achievements' ? 'active' : 'hidden'}`}
              >
                <PerfectScrollbar>
                  <p
                    dangerouslySetInnerHTML={{ __html: this.props.translations[this.props.language].resume_section_achievements_content }}
                  />
                </PerfectScrollbar>
              </div>

              <div
                className={`about-box ${this.state.activeTab === 'choirs' ? 'active' : 'hidden'}`}
              >
                <PerfectScrollbar>
                  <p
                    dangerouslySetInnerHTML={{ __html: this.props.translations[this.props.language].resume_section_choirs_content }}
                  />
                </PerfectScrollbar>
              </div>

              <div
                className={`about-box ${this.state.activeTab === 'compositions' ? 'active' : 'hidden'}`}
              >
                <PerfectScrollbar>
                  <p
                    dangerouslySetInnerHTML={{ __html: this.props.translations[this.props.language]?.resume_section_compositions_content }}
                  />
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </section>
      </ScrollableSection>
    )
  }
}

About.propTypes = {
  translations: PropTypes.object,
  language: PropTypes.string
}
