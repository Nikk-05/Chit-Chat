import React, { useEffect } from 'react'
import { useChatState } from '../global/useChatState.js'
import ChatHeader from './ChatHeader.jsx'
import ChatInput from './ChatInput.jsx'
import MessageSkeleton from './skeleton/MessageSkeleton.jsx'

function ChatContainer() {
  const { chats, getMessages, isMessagesLoading, selectedUser } = useChatState()

  if (isMessagesLoading) return <MessageSkeleton />
  useEffect(() => {
    getMessages(selectedUser._id)
  }, [getMessages._id, getMessages, selectedUser,])

  return (
    <div className="flex flex-col flex-1">
      <div>
        <ChatHeader className='flex-none p-4 bg-blue text-white' />
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {
          chats.map((chat) => {
            return (
              <div key={chat._id} className={`chat ${chat.sender === selectedUser._id ? 'chat-start' : 'chat-end'}`}>
                {/* Chat Content Wrapper */}
                <div className="chat-content-wrapper flex flex-col items-end space-y-1">
                  {/* Chat Message */}
                  <div className="chat-content bg-gray-900 rounded-lg p-3 max-w-xs text-sm text-white shadow">
                    {/* Display Message Text */}
                    {chat.message && <p>{chat.message}</p>}

                    {/* Display Images */}
                    {chat.images.length > 0 && (
                      <div className="chat-images mt-2 flex flex-wrap gap-2">
                        {
                          <img
                            src={chat.images}
                            alt="Chat"
                            className="rounded-lg max-h-40 object-cover"
                          />
                        }
                      </div>
                    )}
                  </div>
                  <span className="chat-timestamp text-gray-400 text-xs right-0">
                    {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

              </div>

            );
          })
        }
      </div>
      <div className='flex-none p-2'>
        <ChatInput />
      </div>

    </div>
  )
}

export default ChatContainer