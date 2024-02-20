import {Routes, Route} from "react-router-dom";


import '../src/assets/styles/style.css'

import Accueil from './assets/pages/Accueil'
import Loader from "./assets/pages/Loader";


function App() {
  return (
    <>
      <div className="MainContainer">
        <Loader/>
        <Routes>
          <Route path="/" element={<Accueil/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
