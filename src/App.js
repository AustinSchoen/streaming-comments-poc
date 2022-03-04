import React from 'react'
import { FrontEndCYOA } from './_components/FrontEndCYOA'
import { socket } from './api/socket-api'
import { SocketContext } from './contexts/SocketContext'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Return FrontEndCYOA component
  return (
    <SocketContext.Provider value={socket} >
        <FrontEndCYOA />
    </SocketContext.Provider>
  );
}

export default App;
