import React, { useEffect } from 'react'
import { useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chats({socket, name, room}) {

    const [ message,setMessage ] = useState("")
    const [ messageList , setMessageList] = useState([])
    const [ memberList , setMemberList ] = useState([])

    const sendMessage = async ()=>{
        if(message !== ""){
            const messageData = {
                roomId : room,
                author : name,
                message : message,
                time : new Date(Date.now()).getHours() + 'hr:' + new Date(Date.now()).getMinutes() +'min'
            }

            await socket.emit("send_message",messageData);
            setMessageList((list)=>[...list,messageData])
            setMessage("")
        }

    }

    useEffect(()=>{
      socket.on("recieved_message",(data)=>{
        setMessageList((list)=>[...list,data])
      })
    },[socket])

  return ( 
    <div className="flex flex-col z-10 mt-40 w-[40%] h-[70vh] items-center border-4 border-white bg-black text-white pb-6">
      <div className='header h-16 flex items-center font-bold text-3xl'>Let's Chat!</div>
      <div className='body bg-slate-300 h-[55vh] w-[100%] text-black'>
        <ScrollToBottom className='scroll h-[100%] w-[100%] overflow-y-scroll overflow-x-hidden'>
        {
            messageList.map((messageData)=>{
                return <div className="messages">
                  {typeof(messageData)==='object'?<><div className={messageData.author===name?'bg-lime-500 rounded-full px-2 h-8 text-lg text-right ml-52':'bg-blue-600 rounded-full px-2 h-8 text-lg text-left mr-52'}>{messageData.message}</div>
                  <div className={messageData.author===name?'text-right':'text-left'}>
                    <p className='text-sm font-bold'>{messageData.author}</p>
                    <p className='ml-4 mb-4 text-sm'>{messageData.time}</p>
                  </div></>:
                  <div className='my-4'>{messageData} has joined the chat !</div>}
                </div>
            })
        }
        </ScrollToBottom>
      </div>
      <div className='footer relative'>
        <input type="text" 
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        onKeyPress={(e)=>{
          e.key==='Enter' && sendMessage()
        }}
        placeholder='Enter Your Message...'
        className='mt-4 h-10 w-80 px-4 rounded-full border-2 border-emerald-300 text-black'/>

        <button onClick={sendMessage} className='absolute right-[-35%] top-[30%] rounded-full px-3 h-10 w-30 text-xl border-2 border-white bg-green-800 '>Send</button>
      </div>
    </div>
  )
}

export default Chats
