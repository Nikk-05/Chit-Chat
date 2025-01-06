import React, { useEffect } from 'react'
import { useChatState } from '../global/useChatState.js'
import ChatHeader from './ChatHeader.jsx'
import ChatInput from './ChatInput.jsx'
import MessageSkeleton from './skeleton/MessageSkeleton.jsx'

function ChatContainer() {
  const { chats, getMessages, isMessagesLoading, selectedUser } = useChatState()
  if (isMessagesLoading) return <MessageSkeleton/>
  console.log(chats)
  useEffect(() => {
    getMessages(selectedUser._id)
  }, [getMessages._id, getMessages])

  return (
    <div className="w-full flex flex-1 flex-col">
      <ChatHeader />
      {
        chats.map((chat) =>{
          console.log(chat)
          return (
            <div key={chat._id} className={`chat ${chat.sender._id === selectedUser._id ? 'chat-start' : 'chat-end'}`}>
              <div className="chat-image avatar">
                <img src={chat.sender.avatar} alt={chat.sender.name} className="w-10 h-10 rounded-full" />
              </div>
              <div className="chat-header mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{chat.sender.name}</span>
                  <span className="text-gray-400 text-xs">{new Date(chat.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="chat-content">{chat.message}</div>
            </div>
          )
        })
      }
      <ChatInput />
    </div>
  )
}

export default ChatContainer