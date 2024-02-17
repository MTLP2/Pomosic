import React, { useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";

export default function MusicPlayer() {
  const streamUrl = "https://ice5.somafm.com/dronezone-128-mp3";
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // État pour suivre si l'audio est en lecture
  const [volume, setVolume] = useState(0.1); // État pour suivre le volume, initialisé à 10%
  const [isButtonActive, setisButtonActive] = useState(false); // Commence comme inactif


  useEffect(() => {
    // Ajuste le volume de l'audio quand le volume d'état change
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]); // Réagir au changement de volume

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  // Gestion du changement de volume via le slider
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };


  useEffect(()=>{
    document.querySelector(".Buttonshow").style.display = 'none'; // Cache l'élément après l'animation

  })

const toggleHide = () => {
  if (!isButtonActive) {
    gsap.to(".MusicPlayerContainer", {
      y: 200,
      autoAlpha: 0, // Rend l'élément complètement invisible et le passe en visibility: hidden
      onComplete: () => {
        document.querySelector(".MusicPlayerContainer").style.display = 'none'; // Cache l'élément après l'animation
        document.querySelector(".Buttonshow").style.display = ''; // Affiche l'élément avant l'animation
      }
    });

    gsap.to(".Buttonshow", {
      y: 0,
      x: 0,
      autoAlpha: 1
    });
  } else {
    // Assure-toi que l'élément est réaffiché avant de commencer l'animation de retour
    document.querySelector(".MusicPlayerContainer").style.display = ''; // Affiche l'élément avant l'animation
    gsap.to(".MusicPlayerContainer", {
      y: 0,
      autoAlpha: 1 // Réaffiche l'élément
    });
    gsap.to(".Buttonshow", {
      y: 200,
      x: 0,
      autoAlpha: 1,
      onComplete: () => {
        document.querySelector(".Buttonshow").style.display = 'none'; // Cache l'élément après l'animation
      }
    });
  }
  setisButtonActive(!isButtonActive);
};

  return (
    <div className='bottom'>
      <button className='Buttonshow' onClick={toggleHide} ><i class="fa-solid fa-arrow-up"></i></button>
      <div className='MusicPlayerContainer'>
        <img src="https://api.somafm.com/img/dronezone120.jpg" alt="Cover art" />
        <button onClick={togglePlayPause}>
          <i className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
        </button>
        <div className="MusicInfo">
          <h3>DRONE ZONE</h3>
          <p>Served best chilled, safe with most medications. Atmospheric textures with minimal beats.</p>
        </div>
        {/* Slider pour ajuster le volume */}
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        {/* Bouton pour cacher/montrer le player (l'action n'est pas définie ici) */}
        <button className='ButtonHide' onClick={toggleHide} ><i className="fa-solid fa-arrow-down-wide-short"></i></button>
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          <source src={streamUrl} type="audio/mpeg" />
          Ton navigateur ne supporte pas l'élément audio.
        </audio>
      </div>
    </div>
  );
}
