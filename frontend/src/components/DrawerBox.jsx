import React,{useState} from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Box,
    Button,
    Input,
    Flex
  } from '@chakra-ui/react'

  function DrawerBox({isOpen,onClose}) {
    const [search, setSearch] = useState('')

    const handleSearch = () => {

    }
    return (
      <>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px'>Search User</DrawerHeader>  
            <DrawerBody p='6px'>
              <Flex alignItems='center'>
                <Input pr='4px' pl='4px' mr='4px' type='text' placeholder='Search User' value = {search} onChange={(e) => setSearch(e.target.value)} />
                <Button bg = 'blue.500' color='white' _hover={{bg: 'blue.600'}}
                onClick = {handleSearch}> Go</Button>
              </Flex>
            </DrawerBody>        
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  export default DrawerBox
