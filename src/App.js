import logo from './logo.svg';
import './App.scss';

import FileDropzone from './components/FileDropzone';

import { FormControl, FormLabel, Input, Button, Textarea } from '@mui/joy';

function App() {
  return (
    <div className="App">
      <div className='main'>
        <FormControl className="access" >
          <FormLabel>Access Code</FormLabel>
          <Input type="text" placeholder='Access Code' />
          <Button>Get Data</Button>
        </FormControl>
        <div className='deliminer' />
        <FormLabel>Upload File</FormLabel>
        <FileDropzone />
        <FormLabel>Write a sentence</FormLabel>
        <textarea className="textarea"></textarea>
        <br />
        <Button>Analyze Text</Button>
      </div>
      <div className='output'>

      </div>
    </div>
  );
}

export default App;
