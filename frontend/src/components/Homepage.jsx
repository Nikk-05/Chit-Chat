import React from 'react'
import { Box, Container, Text } from '@chakra-ui/react'

function Homepage() {
  return (
   <Container maxW = 'xl' centerContent>
    <Box 
    d='flex'
    justifyContent='center'
    p = "3"
    bg = 'white'
    w = '100%'
    m = "40px 0 15px 0"
    borderRadius='lg'
    borderWidth={'1px'}
    >
        <Text textAlign={'center'} fontSize={'4xl'} fontFamily={"work sans"} >Chit-Chat</Text>
    </Box>
   </Container>
  )
}

export default Homepage