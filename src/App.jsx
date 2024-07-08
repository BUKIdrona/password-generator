import { useState, useCallback, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charactersAllowed, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charactersAllowed) str += "!@#$%^&*_+=[]{}~'";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 7)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id='charactersInput'
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            />
            <label htmlFor='charactersInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
