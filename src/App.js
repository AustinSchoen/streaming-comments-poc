import logo from './logo.svg';
import './App.css';
import { FrontEndCYOA } from './_components/FrontEndCYOA'
import { SocketContext, socket } from './api/socket-api'

function App() {
  // Return FrontEndCYOA component
  return (
    <SocketContext.Provider value={socket} >
        <FrontEndCYOA />
    </SocketContext.Provider>
  );
}

export default App;
