import React from 'react'

export default function MusicPlayer() {
  return (
    <div className='MusicPlayerContainer'>
      <img src="" alt="" />
      <button><i class="fa-solid fa-play"></i></button>
      <div className="MusicInfo">
        <h3>LOW KEY</h3>  
        <p>Playing KUTMAH MIX , BEATS & RAP</p>
      </div>
      <button className='ButtonHide'><i class="fa-solid fa-arrow-down-wide-short"></i></button>
    </div>
  )
}
