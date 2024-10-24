import { Box, Drawer, Flex, Spacer } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

export default function Chatpage() {
  return (
    <Flex w = '100%' flexDirection='column'>
      <Navbar />
      <Flex  w='100%' flex='1' alignItems='flex-start' bg='green.300' borderWidth='2px' borderColor='black'>
        <MyChats />
        <ChatBox />
      </Flex>
    </Flex>
  )
}
