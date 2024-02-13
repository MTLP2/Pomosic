import React from 'react'

import Pomodoro from '../Component/Pomodoro'
import MusicPlayer from '../Component/MusicPlayer'

export default function Accueil() {
  return (
    <div className='AccueilContainer'>
      <Pomodoro/>
      <MusicPlayer/>
    </div>
  )
}
