import { Flex, Tooltip, Text, Button, Menu, MenuItem, Box } from '@chakra-ui/react'
import React from 'react'

const SideDrawer = () => {
    return (
        <>
            <Flex justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 10px 5px 10px' borderWidth='5px'>
                <Tooltip label='Search User to Chat' hasArrow placement='bottom-end'>
                    <Button variant='ghost'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize='2xl' fontFamily='work-sans'>Chit-Chat</Text>
                <Box>
                    <Menu>
                        <MenuItem p='1'>
                            <i className="fa-solid fa-bell"></i>
                        </MenuItem>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Actions
                        </MenuButton>
                    </Menu>
                </Box>

            </Flex>
        </>
    )
}

export default SideDrawer