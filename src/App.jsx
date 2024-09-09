import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const CopyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center p-5'>Password Generator</h1>
        <div className='flex gap-3 p-3'>
          <input
            className='p-2 w-full mx-auto rounded-md'
            type="text"
            value={password}
            placeholder='password'
            readOnly
            ref={passwordRef} // Corrected ref usage
          />
          <button
            className='bg-blue-800 p-2 rounded-md hover:bg-blue-900 transition-transform ease-out'
            onClick={CopyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className='flex gap-3'>
          <div className='flex gap-4'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer'
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex gap-1'>
            <input
              type="checkbox"
              checked={numberAllowed} // Bind checked to state
              id='numberInput'
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor='numberInput'>Number</label> {/* Corrected to htmlFor */}
          </div>
          <div className='flex gap-1'>
            <input
              type="checkbox"
              checked={charAllowed} // Bind checked to state
              id='charInput'
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor='charInput'>Character</label> {/* Corrected to htmlFor */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
