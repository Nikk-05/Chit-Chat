import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { FaUser } from 'react-icons/fa6';
import { useAuthState } from '../global/useUserState.js';
import ProfileImg from '../assets/Profile.png';
import { RiImageEditFill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";

const ProfilePage = () => {
  const { authUser, isUpdatingProfilePicture, updateProfilePictureHandler } = useAuthState();

  const updateProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      updateProfilePictureHandler(file)
    }
    else{
      alert('Something went wrong, please try again')
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4 my-auto bg-gray-950">
      <div className='flex flex-row bg-white rounded-xl shadow-lg w-full max-w-3xl overflow-hidden'>
        <div className='flex flex-col items-center bg-gray-900 p-4'>
          <h1 className='text-2xl font-bold text-indigo-600 mb-4'>Profile</h1>
          <p className='text-gray-400 mb-4'>Manage your profile information</p>
          <div className='relative'>
            <img
              src={authUser?.data.user.profilePicture || ProfileImg}
              alt="Profile"
              className='w-40 h-40 rounded-full object-cover border-4 border-indigo-600'
            />
            <label htmlFor="upload-image"
              className={`absolute bottom-0 right-0 bg-indigo-600 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfilePicture ? 'animate-pulse pointer-events-none' : ''}`}>
              <RiImageEditFill className='w-4 h-4 text-white' />
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                className="hidden"
                onChange={updateProfilePicture}
                disabled={isUpdatingProfilePicture}
              />
            </label>
          </div>
          <p className='text-xs text-gray-400 mt-2'>
            {isUpdatingProfilePicture ? 'Uploading Profile Picture...' : 'Click the icon to upload profile picture'}
          </p>
        </div>

        <div className='p-6 bg-gray-100 flex-1'>
          <div className='mb-4'>
            <div className='text-sm text-gray-600 flex items-center gap-2 mb-1'>
              <FaUser className='w-4 h-4 text-indigo-400' />
              Full Name
            </div>
            <p className='px-3 py-2 bg-white rounded-lg border border-gray-300 text-black'>{authUser?.data.user.fullname}</p>
          </div>

          <div className='mb-4'>
            <div className='text-sm text-gray-600 flex items-center gap-2 mb-1'>
              <IoMdMail className='w-4 h-4 text-indigo-400' />
              Email
            </div>
            <p className='px-3 py-2 bg-white rounded-lg border border-gray-300 text-black'>{authUser?.data.user.email}</p>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-md font-medium text-indigo-600 mb-3'>Account Information</h2>
            <div className='text-sm text-gray-600'>
              <div className='flex justify-between py-1 border-b border-gray-300'>
                <span>Member Since</span>
                <span>{authUser?.data.user.createdAt.split("T")[0]}</span>
              </div>
              <div className='flex justify-between py-1'>
                <span>Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
