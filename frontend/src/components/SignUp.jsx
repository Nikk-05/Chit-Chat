import React, { useState, useRef } from 'react'
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    profilePicture: Yup.mixed().required('Profile Picture is required'),
})

const handleFileUpload = (event, setFieldValue) => {
    const file = event.target.files[0];      // 1. Access the file from the input field
    const reader = new FileReader();         // 2. Create a FileReader object to read the file

    reader.onloadend = () => {               // 5. When reading is complete:
        setFieldValue('profilePicture', reader.result); // 6. Store base64 string in Formik's state
    };

    if (file) {                              // 4. Proceed only if a file is selected
        reader.readAsDataURL(file);            // 3. Read the file and convert it to base64
    }
};

const SignUpFormData = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    return (
        <Formik
            initialValues={
                {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    profilePicture: ''
                }}
            validationSchema={validationSchema}
            onSubmit={(data, { resetForm }) => {
                console.log(data)
                toast({
                    title: 'Sign Up Successful',
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                })
                // navigate to login page after successful sign up
                setTimeout(() => {
                    navigate('/login'), 100
                })

                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
                // revome current values
                resetForm({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }}
        >
            {({ errors, touched, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Field name='name'>
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...field} type='text' placeholder='Enter your name' borderWidth='1px' borderColor='tale.200' />
                                    {errors.name && touched.name ? <FormErrorMessage>{errors.name}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>

                        <Field name="email">
                            {({ field }) => (
                                <FormControl isInvalid={errors.email && touched.email} isRequired >
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} type='email' placeholder='Enter your email address' borderWidth='1px' borderColor='tale.200' />
                                    {errors.email && touched.email ? <FormErrorMessage>{errors.email}</FormErrorMessage> : null}
                                </FormControl>
                            )}

                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <FormControl isInvalid={errors.password && touched.password} isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input {...field} type="password" placeholder="Enter password" borderWidth='1px' borderColor='tale.200' />
                                    {errors.password && touched.password ? <FormErrorMessage>{errors.password}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>

                        <Field name="confirmPassword">
                            {({ field }) => (
                                <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword} isRequired>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input {...field} type="password" placeholder="Confirm your password" borderWidth='1px' borderColor='tale.200' />
                                    {errors.confirmPassword && touched.confirmPassword ? <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>

                        <Field name="profilePicture">
                            {({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <Input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, setFieldValue)} ref={fileInputRef}
                                        placeholder='Upload profile picture' borderWidth='1px' borderColor='tale.200' pt='4px' left='2px' />
                                    {errors.profilePicture && touched.profilePicture ? <FormErrorMessage>{errors.profilePicture}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>

                        <Button type='submit' w='100%' bg='blue.500' color='white' mt='2' _hover={{ bg: 'blue.700' }}>Sign Up</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}


const SignUp = () => {
    return (
        <SignUpFormData />
    )
}

export default SignUp