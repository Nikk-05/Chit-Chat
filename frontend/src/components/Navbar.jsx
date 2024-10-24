import { Flex, Tooltip, Text, Button, Menu, MenuItem, MenuButton, Box, Avatar, AvatarBadge, MenuList, MenuDivider } from '@chakra-ui/react'
import { ChevronDownIcon, BellIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal.jsx'
import DrawerBox from './DrawerBox.jsx'
import React,{useState} from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = {
        name: 'Oshigaki Kisame',
        pic: 'https://bit.ly/kent-c-dodds',
        email: 'abcd@gmail.com',
    }
    const toggleDrawer = () =>{
        setIsOpen(!isOpen)
    }

    const closeDrawer = () =>{
        setIsOpen(false)
    }

    return (
        <>
            <Flex justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 10px 5px 10px' borderWidth='5px'>
                <Tooltip label='Search User' hasArrow placement='bottom-end'>
                        <Button variant='ghost' onClick={toggleDrawer}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <Text display={{base:"none" , md : "flex" }} px="4">Search User</Text>
                        </Button>
                </Tooltip>
                <DrawerBox isOpen ={isOpen} onClose={closeDrawer}/>
                <Text fontSize='2xl' fontFamily='work-sans'>Chit-Chat</Text>
                <Flex>
                    <Menu>
                        <MenuButton>
                            <BellIcon fontSize='2xl' m='1' />
                        </MenuButton>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg='transparent'>
                            <Avatar size='sm' name='Oshigaki Kisame' src='https://bit.ly/kent-c-dodds' >
                                <AvatarBadge boxSize='1rem' bg='green.500' />
                            </Avatar>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem>Log Out</MenuItem>
                        </MenuList>

                    </Menu>
                </Flex>

            </Flex >
        </>
    )
}

export default Navbar