import { Context } from '../Context.js';
import { useContext, useEffect, useRef } from 'react';

const UsernamePrompt = ({handleUsernameInputChange, handleUsernameInputEnter}) => {
  const { usernameInput } = useContext(Context);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div id="habitListContainer" style={{padding:'15px 10px 0px'}}>
      <div style={{opacity:0.7, textAlign: 'center', fontFamily:'monospace'}}>
        please enter your username.
      </div>
      <div style={{ padding:'1rem 0'}}>
        <div style={{display: 'inline-flex'}}>
          <input ref={inputRef} id="usernameInput" style={{textAlign:'center', padding: '0 0px'}}  
          value={usernameInput} autofocus
          onKeyDown={handleUsernameInputEnter} 
          onChange={handleUsernameInputChange}/>
        </div>
      </div>
    </div>
  );
}

export default UsernamePrompt;