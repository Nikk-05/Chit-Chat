import React from 'react'
import {
    Box,
    Container,
    Text,
    Button,
   
} from '@chakra-ui/react'
import Tabs from '../components/Tabs.jsx'


function Homepage() {
    return (
        <Container d='flex' justifyContent='center' maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p="3"
                bg='white'
                w='100%'
                m="40px 0 15px 0"
                borderRadius='lg'
                borderWidth={'1px'}
            >
                <Text textAlign='center' fontSize='4xl' fontFamily="work sans" >Chit-Chat</Text>
            </Box>
            <Box bgColor='white' w='100%' borderRadius='lg' p='4' borderWidth='1px'>
                <Tabs/>
            </Box>
        </Container>
    )
}

export default Homepage