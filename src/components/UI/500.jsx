import React from 'react'
import SectionBackground from '../UX/SectionBackground'

export default function Error500() {
  return (
    <section id='home'>
      <div className='right-side photo'>
        <h1 className="mobile-title">Error</h1>
          <div className='photo-container' style={{height: '100%'}}/>
      </div>
      <div className='left-side text'>
        <SectionBackground/>

        <h1>Technical issues</h1>
      </div>
    </section>
  )
}