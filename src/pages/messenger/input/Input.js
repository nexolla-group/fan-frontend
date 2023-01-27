import React from "react";
import "./input.css";

const Input = () => (
  <form className='form'>
    <input className='input' type='text' placeholder='Type a message...' />
    <button className='sendButton' onClick={() => {}}>
      Send
    </button>
  </form>
);

export default Input;
