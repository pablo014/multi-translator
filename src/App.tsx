import { useState } from 'react'
import axios from "axios";
import './App.css'
import data from './assets/languages.json'

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState('')
  const [list, setList] = useState<Array<string>>([])

  function getRandomProperty (obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  };

  function getKey (obj, val: string) {
    return Object.keys(obj).find(key => obj[key] === val)
  }
  async function translate(){

    let sourceText = input;
    let sourceLang = 'en';
    let targetLang;
    for (let i = 0; i < count; i++) {
      targetLang = i < count - 1 ? getRandomProperty(data) : 'en'
      const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
      const res = await axios.get(url);
      sourceText = res.data[0][0][0];
      setList(arr => [...arr, sourceText])
      sourceLang = targetLang;
    }
  }
  return (
    <div className='container'>
      <div className='input'>
        <input onInput={e => setInput(e.target.value)} placeholder='Text to translate'/>
        <input type='number' defaultValue={count} onInput={e => setCount(e.target.value)} placeholder='numberOfTimes'/>
        <button onClick={translate}>Submit</button>
      </div>
      <div className='list'>
        <ul>
          {list.map(item => (
              <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
