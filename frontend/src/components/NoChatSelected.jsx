import React from 'react'
import { LuMessageCircle } from 'react-icons/lu';
import { useChatState } from '../global/useChatState.js';

const NoChatSelected = () => {
  const {selectedUser} = useChatState()
  return (
    <div className="hidden lg:w-full lg:flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <LuMessageCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chit-Chat!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;