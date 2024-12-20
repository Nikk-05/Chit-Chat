import React, { useState } from 'react';
import introImg from '../assets/Intro.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LuEye, LuEyeClosed } from "react-icons/lu";

const validationSchema = Yup.object({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-screen h-screen flex items-center justify-center p-4">
            <div className="flex flex-col-reverse lg:flex-row bg-white rounded-xl shadow-lg w-full max-w-6xl overflow-hidden">
                {/* Left Image Section */}
                <div className="hidden lg:flex lg:w-1/2">
                    <img
                        alt="Intro"
                        src={introImg}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Form Section */}
                <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10">
                    <div className="mb-8 text-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-8"
                        />
                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                            Sign Up Now!
                        </h2>
                    </div>

                    <Formik
                        initialValues={{ fullname: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ errors, touched, handleSubmit }) => (
                            <Form onSubmit={handleSubmit} className="flex flex-col">
                                {/* Fullname Field */}
                                <Field name="fullname">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Full name"
                                            className="text-md bg-white text-black placeholder:text-gray-600 placeholder:text-sm pb-2 pl-2 bg-transparent border-b-2 border-gray-700 my-4 focus:outline-none"
                                        />
                                    )}
                                </Field>
                                {errors.fullname && touched.fullname && (
                                    <div className="text-red-500 text-xs">{errors.fullname}</div>
                                )}

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
                                    <div className="text-red-500 text-xs">{errors.email}</div>
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
                                    <div className="text-red-500 text-xs">{errors.password}</div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-black color-white rounded-3xl py-2 font-bold text-sm text-white mt-3"
                                >
                                    Sign Up
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-600">
                            Already have an account?
                            <a href="/login" className="ml-2 text-sm font-semibold text-black hover:underline">
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
