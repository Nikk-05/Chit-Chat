import { Image, useDisclosure } from '@chakra-ui/react'
import React, { Children } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    Text
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? (<span onClick={onOpen}>{children}</span>)
                : (
                    <IconButton d={{ base: " flex" }} icon={<ViewIcon />} onClick={onOpen} />
                )}
            <Modal borderWidth= '5px' borderColor = 'yellow' size='lg' d= 'flex' flexDirection ='' justifyContent = 'center' alignItems= 'flex-end' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize = '30px' fontFamily="Work sans" d= 'flex'  justifyContent='center'>{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody  borderWidth= '2px' borderColor = 'red' d = 'flex' flexDirection= 'row' alignItems='center' justifyContent='space-between'>
                       <Image borderRadius='full' boxSize = '100px' src= {user.pic} alt = {user.name}/>
                        <Text fontFamily="Work sans" fontSize='20px'>Email: {user.email}</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )
}

export default ProfileModal