import React from 'react'
import {Parallax} from 'react-scroll-parallax'
import SectionBackground from '../UX/SectionBackground'

export default function Error500() {
  return (
    <section id='home'>
      <div className='right-side photo'>
        <h1 className="mobile-title">Error</h1>
        <Parallax translateY={[-25, 25]} style={{height: '100%'}}>
          <div className='photo-container' style={{height: '100%'}}/>
        </Parallax>
      </div>
      <div className='left-side text'>
        <SectionBackground/>

        <h1>Error</h1>
      </div>
    </section>
  )
}