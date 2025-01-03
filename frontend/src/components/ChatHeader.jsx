import React from 'react'
import { X } from "lucide-react";
import { useChatState } from '../global/useChatState.js'
import avatar from '../assets/avatar.png'

function ChatHeader() {
    const { selectedUser,setSelectedUser } = useChatState()
    const onlineUsers = []
    return (
        <div className="p-2.5 border-b border-gray-300 bg-gray-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePicture || avatar} alt={selectedUser.fullname} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium text-white">{selectedUser.fullname}</h3>
                        <p className="text-sm text-gray-300">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader