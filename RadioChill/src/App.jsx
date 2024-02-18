import {Routes, Route} from "react-router-dom";
import { useState } from 'react'

import '../src/assets/styles/style.css'

import Accueil from './assets/pages/Accueil'
import About from './assets/pages/About'
import Nav from "./assets/Component/Nav";
import Loader from "./assets/pages/Loader";


function App() {
  return (
    <>
      <div className="MainContainer">
        <Loader/>
        <Nav/>
        <Routes>
          <Route path="/" element={<Accueil/>} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
