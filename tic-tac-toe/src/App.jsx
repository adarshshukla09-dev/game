import TicTicTacToe  from './Tic-Tac-Toe'
import SimonSays from './SimonSays'
import './App.css'
import { Toaster } from 'react-hot-toast'
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
    {/* <TicTicTacToe/> */}
    <SimonSays/>
    </>
  )
}

export default App
