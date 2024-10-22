import React, { useState } from 'react'
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button,
    Link as ChakraLink,
    FormErrorMessage,
    useToast,
    Spinner
} from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const LoginFormData = () => {
    const toast = useToast()
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
                toast({
                    title: 'Login Successful',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                {<Spinner />}
                setTimeout(() => {
                    navigate('/chat'), 5000
                })
            }}
        >
            {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Field name="email" >
                            {({ field }) => (
                                <FormControl isInvalid={errors.email && touched.email} isRequired >
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} type="email" placeholder='Enter your email' borderWidth='1px' borderColor='tale.200' />
                                    {errors.email && touched.email ? <FormErrorMessage>{errors.email}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>
                        <Field name="password" >
                            {({ field }) => (
                                <FormControl isInvalid={errors.password && touched.password} isRequired >
                                    <Flex d='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                                        <FormLabel>Password</FormLabel>
                                        <ChakraLink as={ReactRouterLink} to="/reset-password" text='sm' color='blue' >
                                            Forgot password?
                                        </ChakraLink>
                                    </Flex>
                                    <Input {...field} type="password" placeholder='Enter your password' borderWidth='1px' borderColor='tale.200' />
                                    {errors.password && touched.password ? <FormErrorMessage>{errors.password}</FormErrorMessage> : null}
                                </FormControl>
                            )}
                        </Field>
                        <Button type='submit' w='100%' bg='blue.500' color='white' mt='2' _hover={{ bg: 'blue.700' }}>Log In</Button>
                    </Stack>
                </Form>
            )}
        </Formik >
    )
}
function Login() {
    return (
        <LoginFormData />
    )
}

export default Login