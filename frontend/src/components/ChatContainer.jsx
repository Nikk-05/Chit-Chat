import React, { useEffect } from 'react'
import { useChatState } from '../global/useChatState.js'
import ChatHeader from './ChatHeader.jsx'
import ChatInput from './ChatInput.jsx'
import MessageSkeleton from './skeleton/MessageSkeleton.jsx'

function ChatContainer() {
  const { chats, getMessages, isMessagesLoading, selectedUser } = useChatState()
  if (isMessagesLoading) return <MessageSkeleton/>
  useEffect(() => {
    getMessages(selectedUser.id)
  }, [getMessages._id, getMessages])

  return (
    <div className="w-full flex flex-1 flex-col">
      <ChatHeader />
      <MessageSkeleton/>
      <ChatInput />
    </div>
  )
}

export default ChatContainer