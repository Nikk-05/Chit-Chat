import React, { useState } from 'react'
import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react'

const SignUp = () => {
    const [passwordValid, setPasswordValid] = useState(true);
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: '',
    });

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSignUpData({ ...signUpData, profilePicture: e.target.result });
            };
            reader.readAsDataURL(file);
            return;
        }
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault()
        if (signUpData.password !== signUpData.confirmPassword) {
            return;
        }
        console.log(signUpData)
        // clear the state data
        setSignUpData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            profilePicture: '',
        })
    }
    
    return (
        <VStack spacing={2}>
            {/* Sign Up form */}
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    name='name'
                    id='name'
                    placeholder='Enter Your Name'
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Your Email Address'
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    min-length='5'
                    onChange={handleChange}
                    placeholder='Enter Password'
                ></Input>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    onChange={handleChange}
                    placeholder='Confirm Password'
                ></Input>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Upload you Picture</FormLabel>
                <Input
                    accept='image/*'
                    alignContent='center'
                    type='file'
                    name='profilePicture'
                    onChange={handleChange}
                />
            </FormControl>
            <Button onClick={submitHandler} w='100%' bg='teal.200' mt='2' _hover={{ bg: 'blue', color: 'white' }}>Sign Up</Button>
        </VStack>
    )
}

export default SignUp