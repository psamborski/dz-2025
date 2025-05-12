import React from 'react'
import {Parallax} from 'react-scroll-parallax'
import SectionBackground from '../UX/SectionBackground'

export default function Error404() {
  return (
    <section id='home'>
      <div className='right-side photo'>
        <Parallax translateY={[-25, 25]} style={{height: '100%'}}>
          <div className='photo-container' style={{height: '100%'}}/>
        </Parallax>
      </div>
      <div className='left-side text'>
        <SectionBackground/>

        <h1>404</h1>
      </div>
    </section>
  )
}