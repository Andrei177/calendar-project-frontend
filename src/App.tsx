import './App.css'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'

function App() {

  return (
      <div className='wrapper'>
        <Navbar/>
        <AppRouter/>
        <footer>2024</footer>
      </div>
  )
}

export default App
