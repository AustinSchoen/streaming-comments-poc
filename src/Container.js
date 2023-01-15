import React from 'react'
import { AppContainer } from './_components/AppContainer'
import { socket } from './api/socket-api'
import { SocketContext } from './contexts/SocketContext'
import 'bootstrap/dist/css/bootstrap.min.css';

function Container() {
  // Return Container component
  return (
    <SocketContext.Provider value={socket} >
        <AppContainer />
    </SocketContext.Provider>
  );
}

export default Container;
