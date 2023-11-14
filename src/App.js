import AccessCodeInput from './components/AccessCodeInput'
import WordInputUpload from './components/WordInputUpload'
import './App.scss'

function App() {
  return (
    <div className="App">
      <form className="main">
        <AccessCodeInput />
        <div className="deliminer" />
        <WordInputUpload />
      </form>
    </div>
  )
}

export default App
