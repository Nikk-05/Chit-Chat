import React, { useState } from 'react'
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Link,
    Flex
} from '@chakra-ui/react'

function Login() {
    const [logInData, setLogInData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setLogInData({ ...logInData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // send logInData to backend for authentication
        console.log(logInData)
        // clear form fields
        setLogInData({ email: '', password: '' })
    }
    return (
        <Stack spacing={2}>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={logInData.email} placeholder='Enter Your Email Address' onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <Flex d='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                    <FormLabel>Password</FormLabel>
                    <Link to="#" text='sm' color='blue'>
                        Forgot password?
                    </Link>
                </Flex>
                <Input type="password" name="password" value={logInData.password} placeholder='Enter Your Password' onChange={handleChange} />
            </FormControl>

            <Button onClick={handleSubmit} w='100%' bg='teal.200' mt='2' _hover={{ bg: 'blue', color: 'white' }}>Log In</Button>

        </Stack>
    )
}

export default Login