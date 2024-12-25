import React from 'react';
import {Link} from 'react-router-dom'
import { Popover, Transition } from '@headlessui/react';
import { LuMessageCircle } from 'react-icons/lu';
import { FaCircleUser } from 'react-icons/fa6';
import { Fragment } from 'react';
import { useAuthState } from '../global/globalState.js';

const Navbar = () => {
  const {authUser, logoutHandler} = useAuthState()
  console.log(authUser)
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left Section: Logo and App Name */}
      <div className="flex items-center space-x-3">
        <LuMessageCircle className="text-indigo-600 text-2xl" />
        <span className="text-xl font-bold text-black">Chit-Chat</span>
      </div>

      {/* Right Section: Profile Dropdown */}
      <div className="relative">
        <Popover className="relative">
          <Popover.Button className="block text-sm font-semibold text-black/50 focus:outline-none hover:text-black">
            <FaCircleUser className="text-4xl" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-3">
                <Link
                  href="#"
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="#"
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-700"
                >
                  Settings
                </Link>
                <button
                  className="block w-full rounded-lg py-2 px-3 transition hover:bg-gray-700"
                  onClick = {logoutHandler}
                >
                  Logout
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
