import { useState } from 'react'

import AccessCodeInput from './components/AccessCodeInput'
import WordInputUpload from './components/WordInputUpload'
import UploadProgressInfo from './components/UploadProgressInfo'
import './App.scss'

function App() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Uploading File");

  function updateProgressBar(loaded, total) {
    setProgress(Math.round((loaded/total)*100))
    setStatus("Uploading File")
  }

  function completedSend() {
    setProgress(100)
    setStatus("File Uploaded")
    setTimeout(() => {
      setProgress(0)
    }, 2000)
  }

  return (
    <div className="App">
      <form className="main">
        <AccessCodeInput />
        <div className="deliminer" />
        <WordInputUpload onUpdateProgress={updateProgressBar} onCompletedLoad={completedSend}/>
      </form>
      {(progress !== 0) ? <UploadProgressInfo progress={progress} status={status} showAccessCode={false}/> : null}
    </div>
  )
}

export default App
