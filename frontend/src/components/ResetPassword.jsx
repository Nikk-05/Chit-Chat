import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import {
    Stack,
    Box,
    Text,
    FormControl,
    FormLabel,
    Input,
    Container,
    Button,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react'
import {Formik,Form, Field} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });


const PasswordResetForm = () => {
    const navigate = useNavigate()
    const toast = useToast()
    return (
        <Formik
        initialValues={{ email: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          toast({
            title: 'Password Reset Successful',
            status: 'success',
            duration: 6000,
            isClosable: true,
          })
          navigate('/')
        }}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Field name="email">
              {({ field }) => (
                <FormControl isInvalid={errors.email && touched.email} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} type="email" placeholder="Enter your email" />
                  {errors.email && touched.email ? <FormErrorMessage>{errors.email}</FormErrorMessage> : null}
                </FormControl>
              )}
            </Field>
  
            <Field name="newPassword">
              {({ field }) => (
                <FormControl isInvalid={errors.newPassword && touched.newPassword} isRequired mt={4}>
                  <FormLabel>New Password</FormLabel>
                  <Input {...field} type="password" placeholder="Enter new password" />
                  {errors.newPassword && touched.newPassword ? <FormErrorMessage>{errors.newPassword}</FormErrorMessage> : null}
                </FormControl>
              )}
            </Field>
  
            <Field name="confirmPassword">
              {({ field }) => (
                <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword} isRequired mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input {...field} type="password" placeholder="Confirm your password" />
                  {errors.confirmPassword && touched.confirmPassword ? <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage> : null}
                </FormControl>
              )}
            </Field>
  
            <Button type="submit" w='100%' bg='blue.500' color = 'white' mt='2' _hover={{ bg: 'blue.700'}}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    )
}

const ResetPassword = () =>{
    return (
        <Container d='flex' justifyContent='center' maxW='xl' centerContent >
            <Box d='flex' justifyContent='center' p="3" bg='white' w='100%' m="40px 0 15px 0" borderRadius='lg' borderWidth={'1px'}>
                <Text textAlign='center' fontSize='4xl' fontFamily="work sans" >Reset Password</Text>
            </Box>
            <Box bgColor='white' w='100%' borderRadius='lg' p='4' borderWidth='1px'>
                <Stack spacing={2}>
                    <PasswordResetForm/>
                </Stack>
            </Box>
        </Container> )
}

export default ResetPassword;