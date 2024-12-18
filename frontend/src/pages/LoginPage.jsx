import React, { useState } from 'react'
import introImg from '../assets/Intro.png'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axiosInstance from '../lib/axios';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});


const LoginPage = () => {
    return (
        <div className='w-screen h-screen flex flex-1 justify-center items-center'>
            <div className='w-3/5 h-3/4 m-25 bg-slate-200 rounded-xl'>
                <div className='flex flex-row w-full items-center justify-center p-2 h-full'>
                    <div className='w-0 sm:w-3/5 sm:h-full'>
                        <img
                            alt="Intro"
                            src={introImg}
                            className="object-cover"
                        />
                    </div>
                    <div className='w-full sm:w-2/5 h-full bg-white rounded-lg'>
                        <div className="flex h-full flex-1 flex-col pt-10 lg:px-8 shadow-sm">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="mx-auto h-6 w-auto"
                                />
                                <h2 className="my-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                    Welcome back!
                                </h2>
                            </div>

                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched, handleSubmit }) => {
                                    const [showPassword, setShowPassword] = useState(false);

                                    return (
                                        <Form onSubmit={handleSubmit} className="flex flex-col">
                                            {/* Email Field */}
                                            <Field name="email">
                                                {({ field }) => (
                                                    <input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Email"
                                                        className="text-md bg-white text-black placeholder:text-gray-600 placeholder:text-sm pb-2 pl-2 bg-transparent border-b-2 border-gray-700 my-4 focus:outline-none"
                                                    />
                                                )}
                                            </Field>
                                            {errors.email && touched.email && (
                                                <div className="text-red-500 text-sm">{errors.email}</div>
                                            )}

                                            {/* Password Field */}
                                            <Field name="password">
                                                {({ field }) => (
                                                    <div className="relative">
                                                        <input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="Password"
                                                            className="text-md bg-white text-black placeholder:text-gray-600 placeholder:text-sm pb-2 pl-2 bg-transparent border-b-2 border-gray-700 my-4 focus:outline-none w-full"
                                                        />
                                                        {/* Eye Icon */}
                                                        <span
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700"
                                                        >
                                                            {showPassword ? <LuEye /> : <LuEyeClosed />}
                                                        </span>
                                                    </div>
                                                )}
                                            </Field>
                                            {errors.password && touched.password && (
                                                <div className="text-red-500 text-sm">{errors.password}</div>
                                            )}

                                            {/* Forgot Password Link */}
                                            <div className="text-right text-sm text-black mt-1 cursor-pointer hover:underline">
                                                <a href="/forgot-password">Forgot Password?</a>
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="bg-black color-white rounded-3xl py-2 font-bold text-sm text-white mt-3"
                                            >
                                                Log In
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>;
                            <div>
                                <button
                                    type="submit"
                                    className="bg-gray-700 rounded-3xl py-2 font-bold text-sm text-black mt-3"
                                >
                                    Google
                                </button>
                            </div>
                            <div>
                                <p className='text-center test-sm text-gray-600 mt-20'>
                                    Don't have an account?
                                    <a href="/signup" className=" ml-2 text-center text-sm font-semibold text-black hover:underline">
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

