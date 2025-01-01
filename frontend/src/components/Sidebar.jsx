import React, { useEffect } from 'react'
import { useChatState } from '../global/useChatState.js'
import SidebarSkeleton from './skeleton/SidebarSkeleton.jsx'
import { Users } from "lucide-react";
import avatar from '../assets/avatar.png'

function Sidebar() {
    const { getUsers, users, selectedUser, isUserLoading, setSelectedUser} = useChatState()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUserLoading) return <SidebarSkeleton />
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-gray-800 flex flex-col bg-gray-950 transition-all duration-200">
        {/* Header */}
        <div className="border-b border-gray-800 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <span className="font-medium text-gray-400 hidden lg:block">Contacts</span>
          </div>
        </div>
      
        {/* User List */}
        <div className="overflow-y-auto w-full py-3">
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-lg transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-gray-800 ring-2 ring-indigo-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {/* User Avatar */}
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePicture || avatar}
                  alt={user.fullname}
                  className="size-12 object-cover rounded-full border-2 border-gray-700"
                />
                {/* Online Indicator */}
                {/* {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-950" />
                )} */}
              </div>
      
              {/* User Info */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium text-gray-400 truncate">{user.fullname}</div>
                {/* <div className="text-sm text-gray-600">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div> */}
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