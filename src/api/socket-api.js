import React from 'react'
import openSocket from 'socket.io-client'

export const socket = openSocket('http://localhost:3002')
export const SocketContext = React.createContext();
