import React from 'react'
import { Container, Text, Button, Box, Stack, Flex } from '@chakra-ui/react'

const MyChats = () => {
  return (
    <Flex bg="white" borderWidth='1px' borderRadius="5px" borderColor='blue'>
        <Box>
        <Text>My Chats</Text>
        <Button>new Group Chat</Button>
        <Stack>
            <Text>1</Text>
            <Text>2</Text>
        </Stack>    
        </Box>
    </Flex>
  )
}

export default MyChats