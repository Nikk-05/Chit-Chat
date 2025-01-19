import React, { useEffect } from 'react'
import { useChatState } from '../global/useChatState.js'
import SidebarSkeleton from './skeleton/SidebarSkeleton.jsx'
import { Users } from "lucide-react";
import avatar from '../assets/avatar.png'

function Sidebar() {
    const { getUsers, users, selectedUser, isUserLoading, setSelectedUser} = useChatState()
    const onlineUsers = []

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading) return <SidebarSkeleton />
    return (
        <aside className={` ${selectedUser ? 'hidden': 'block'} h-full w-full lg:w-72 border-r border-gray-800 lg:flex flex-col bg-gray-950 transition-all duration-200`}>
        {/* Header */}
        <div className="border-b border-gray-800 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <span className="font-medium text-gray-400 hidden lg:block">Contacts</span>
          </div>
        </div>
      
        {/* User List */}
        <div className="flex flex-col justify-center items-center overflow-y-auto w-full py-3">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-gray-800" 
                  : "hover:bg-gray-600"
              }`}
            >
              {/* User Avatar */}
              <div className="relative mx-10 lg:mx-0">
                <img
                  src={user.profilePicture || avatar}
                  alt={user.fullname}
                  className="size-12 object-cover rounded-full border-2 border-gray-700 max-w-100"
                />
                {/* Online Indicator */}
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-950" />
                )}
              </div>
      
              {/* User Info */}
              <div className="lg:block text-left min-w-0">
                <div className="font-medium text-white truncate">{user.fullname}</div>
                <div className="text-sm text-white">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
      
          {/* No Users Message */}
          {users.length === 0 && (
            <div className="text-center text-gray-500 py-4">No online users</div>
          )}
        </div>
      </aside>
    )
}

export default Sidebar