import React from 'react'
import introImg from '../assets/Intro.png'

const LoginPage = () => {
    return (
        <div className='w-screen h-screen flex flex-1 justify-center items-center'>
            <div className='w-3/5 h-3/4 m-25 bg-slate-200 rounded-xl'>
                <div className='flex flex-row w-full items-center justify-center p-2 h-full'>
                    <div className ='w-3/5 h-full'>
                        <img
                            alt="Intro"
                            src={introImg}
                            className="object-cover"
                        />
                    </div>
                    <div className='w-2/5 h-full bg-white rounded-lg'>
                        <div className="flex h-full flex-1 flex-col justify-center lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="mx-auto h-10 w-auto"
                                />
                                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                    Welcome back!
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                placeholder='Email'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                placeholder='Password'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                            <div className="text-sm">
                                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Forgot password?
                                                </a>
                                            </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                                <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                           Google
                                        </button>
                                    </div>
                                

                                <p className="mt-10 text-center text-sm/6 text-gray-500">
                                    Not a member?{' '}
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage