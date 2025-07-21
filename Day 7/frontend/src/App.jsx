import { useState } from 'react'
import FacialExpression from "./components/FacialExpression"
import './App.css'
import MoodSongs from './components/MoodSongs'

function App() {

  const [Songs, setSongs] = useState([]);

  return (
    <>
     <h1 className='logo'>Moody Player</h1>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </>
  )
}

export default App