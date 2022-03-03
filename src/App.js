import React from 'react'
import './App.css';
import { FrontEndCYOA } from './_components/FrontEndCYOA'
import { socket } from './api/socket-api'
import { SocketContext } from './contexts/SocketContext'

function App() {
  // Return FrontEndCYOA component
  return (
    <SocketContext.Provider value={socket} >
        <FrontEndCYOA />
    </SocketContext.Provider>
  );
}

export default App;
