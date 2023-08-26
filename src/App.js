import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:3001")

function App() {

  const [name,setName] = useState("")
  const [roomId,setRoomId] = useState("")
  const [isLoggedIn,setLoggedIn] = useState(false)

  const JoinRoom = () =>{
    if(name !== "" || roomId !== ""){
      setLoggedIn(true)
      const data = {
        name:name,
        roomId:roomId
      }
      socket.emit("join_room",data)
    }
  }

  return (
    <div className="App flex justify-center h-[100vh] bg-green-400 overflow-hidden">
      <div className='h-[80%] rounded-full w-20 bg-slate-400 rotate-[60deg] absolute bottom-[-15%] left-[10%]'></div>
      <div className='h-[50%] rounded-full w-5 bg-slate-400 rotate-[60deg] absolute bottom-[5%] left-28'></div>

      <div className='h-[70%] rounded-full w-20 bg-slate-400 rotate-[60deg] absolute top-[-23%] right-[17%]'></div>
      <div className='h-[50%] rounded-full w-5 bg-slate-400 rotate-[60deg] absolute top-[-13%] right-[11%]'></div>
    {!isLoggedIn?
    <div className="flex flex-col mt-56 w-[30%] h-[50vh] items-center border-4 border-white bg-black text-white pb-6">
      <h1 className="text-5xl mt-4">Let's Chat!</h1>
      <input 
      type="text" 
      placeholder='Enter your name...' 
      value={ name }
      onChange={(e)=>{setName(e.target.value)}}
      className='my-10 h-10 px-3 rounded-full border-2 border-emerald-300 text-black'
      />

      <input 
      type="text" 
      placeholder='Room ID...' 
      value={ roomId }
      onChange={(e)=>{setRoomId(e.target.value)}}
      className='mb-16 h-10 px-3 rounded-full border-2 border-emerald-300 text-black'
      />

      <button onClick={JoinRoom} className='rounded-full px-3 h-14 w-40 text-2xl border-2 border-white bg-green-950 '>Join Room</button>
      </div>
      :
      <Chats socket={socket} username={name} room={roomId}></Chats>
    }
    </div>
  );
}

export default App;
