import { FormLabel, Button } from '@mui/joy'

import FileDropzone from './components/FileDropzone'
import AccessCodeInput from './components/AccessCodeInput'
import './App.scss'

function App() {
  return (
    <div className="App">
      <form className="main">
        <AccessCodeInput />
        <div className="deliminer" />
        <FormLabel>Upload File</FormLabel>
        <FileDropzone />
        <FormLabel>Write a sentence</FormLabel>
        <textarea className="textarea"></textarea>
        <br />
        <Button style={{marginBottom: "2em"}}>Analyze Text</Button>
      </form>
    </div>
  )
}

export default App
