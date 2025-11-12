import TicTicTacToe  from './Tic-Tac-Toe'
import SimonSays from './SimonSays'
import RPs from './RPs'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Stopwatch from './Stopwatch'
function App() {

  return (
    <>
<Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
    },
  }}
/>
    <TicTicTacToe/>
    <SimonSays/>
    <Stopwatch/>
    <RPs/>
    </>
  )
}

export default App
